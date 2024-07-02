import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useStytchB2BClient,
  useStytchMemberSession,
  useStytchOrganization,
} from '@stytch/nextjs/b2b';
import { B2BOrganizationsUpdateOptions } from '@stytch/vanilla-js';
import { withStytchPermissions } from '@stytch/nextjs/b2b';
import './Settings.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Settings = (props: any) => {
  const stytch = useStytchB2BClient();
  const { session } = useStytchMemberSession();
  const { organization } = useStytchOrganization();
  const [activeTab, setActiveTab] = useState('authentication');
  const [jitProvisioningEnabled, setJitProvisioningEnabled] = useState(false);
  const [allowedDomains, setAllowedDomains] = useState<string[]>([]);
  const [newDomain, setNewDomain] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const canEnableJIT =
    props.stytchPermissions['stytch.organization'][
      'update.settings.email-jit-provisioning'
    ];
  const canUpdateAllowedDomains =
    props.stytchPermissions['stytch.organization'][
      'update.settings.allowed-domains'
    ];
  const canSearchMembers = props.stytchPermissions['stytch.member']['search'];
  const canDeleteMembers = props.stytchPermissions['stytch.member']['delete'];
  const canCreateMembers = props.stytchPermissions['stytch.member']['create'];

  useEffect(() => {
    if (session && organization) {
      if (organization.email_jit_provisioning == 'RESTRICTED') {
        setJitProvisioningEnabled(true);
        setAllowedDomains(organization.email_allowed_domains);
      }

      stytch.organization.members
        .search({})
        .then((response) => {
          setMembers(response.members);
        })
        .catch((error) => console.error('Error fetching settings:', error));
    }
  }, [session, organization, stytch.organization.members]);

  const handleSave = () => {
    if (session) {
      const params = {
        email_allowed_domains: allowedDomains,
        email_jit_provisioning: 'NOT_ALLOWED',
      } as B2BOrganizationsUpdateOptions;
      if (jitProvisioningEnabled) {
        params.email_jit_provisioning = 'RESTRICTED';
      }
      stytch.organization
        .update(params)
        .then((response) => {
          console.log('Settings saved successfully');
        })
        .catch((error) => console.error('Error saving settings:', error));
    }
  };

  const addDomain = () => {
    if (newDomain && !allowedDomains.includes(newDomain)) {
      setAllowedDomains([...allowedDomains, newDomain]);
      setNewDomain('');
    }
  };

  const removeDomain = (domain: string) => {
    setAllowedDomains(allowedDomains.filter((d) => d !== domain));
  };

  const deleteMember = (memberId: string) => {
    if (session) {
      stytch.organization.members
        .delete(memberId)
        .then((response) => {
          setMembers(members.filter((member) => member.member_id !== memberId));
          console.log('Member deleted successfully');
        })
        .catch((error) => console.error('Error deleting member:', error));
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Organization Settings</h1>
      <div className="settings-menu">
        <div
          className={`settings-menu-item ${activeTab === 'authentication' ? 'active' : ''}`}
          onClick={() => setActiveTab('authentication')}
        >
          Authentication Settings
        </div>
        <div
          className={`settings-menu-item ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Member Settings
        </div>
      </div>
      {activeTab === 'authentication' && (
        <div className="settings-card">
          <h2>JIT Provisioning</h2>
          <div className="setting-item">
            <label className="toggle-label">Enable JIT Provisioning</label>
            <label className={`switch ${!canEnableJIT ? 'disabled' : ''}`}>
              <input
                type="checkbox"
                checked={jitProvisioningEnabled}
                onChange={(e) => setJitProvisioningEnabled(e.target.checked)}
                disabled={!canEnableJIT}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-item">
            <label className="domains-label">Allowed Email Domains</label>
            <div className="domains">
              {allowedDomains.map((domain, index) => (
                <div key={index} className="domain-chip">
                  {domain}
                  {canUpdateAllowedDomains && (
                    <button onClick={() => removeDomain(domain)}>x</button>
                  )}
                </div>
              ))}
            </div>
            {canUpdateAllowedDomains && (
              <div className="add-domain-container">
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="Add a domain"
                />
                <button onClick={addDomain} className="add-button">
                  Add
                </button>
              </div>
            )}
          </div>
          {canUpdateAllowedDomains && (
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          )}
        </div>
      )}
      {activeTab === 'members' && (
        <div className="settings-card">
          <h2>Member Settings</h2>
          {!canSearchMembers && (
            <div>
              You don&apos;t have permission to view all Members of the
              Organization. To allow everyone the ability to view the Membership
              list for their Organization, go to the{' '}
              <a href="https://stytch.com/dashboard/rbac?env=test&type=Roles">
                Stytch Dashboard Roles & Permissions
              </a>{' '}
              section, and add the `stytch.member.search` permission the the
              `stytch_member` Role
            </div>
          )}
          <table className="members-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                {canDeleteMembers && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.member_id}>
                  <td>{member.name}</td>
                  <td>{member.email_address}</td>
                  <td>
                    {member.roles.map((role: any, index: number) => (
                      <span key={index} className="role-chip">
                        {role.role_id}
                      </span>
                    ))}
                  </td>
                  {canDeleteMembers && (
                    <td>
                      <span
                        onClick={() => deleteMember(member.member_id)}
                        className="delete-member"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showToast && <div className="toast">Your changes have been saved</div>}
    </div>
  );
};

const WrappedSettings = withStytchPermissions(Settings);

export default WrappedSettings;
