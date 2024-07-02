import React, { useState, useEffect } from 'react';
import './Profile.css';
import {
  useStytchB2BClient,
  useStytchMemberSession,
  useStytchMember,
} from '@stytch/nextjs/b2b';

const Profile = () => {
  const { session } = useStytchMemberSession();
  const { member } = useStytchMember();
  const stytch = useStytchB2BClient();
  const [activeTab, setActiveTab] = useState('user');
  const [showToast, setShowToast] = useState(false);
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (session && member) {
      stytch.self.get();
      setName(member.name);
      setEmail(member.email_address);
    }
  }, [session, member, stytch.self]);

  const handleSave = () => {
    if (member) {
      stytch.organization.members
        .update({
          name: fullName,
          member_id: member.member_id,
        })
        .then((response) => {
          showToastNotification();
          console.log('Successfully updated member name');
        })
        .catch((error) => console.error('Error updating member:', error));
    }
  };

  const showToastNotification = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-menu">
        <div
          className={`profile-menu-item ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          User Settings
        </div>
      </div>
      {activeTab === 'user' && (
        <div className="profile-card">
          <h2>User Settings</h2>
          <div className="profile-item">
            <label>Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="profile-item">
            <label>Email</label>
            <input type="text" value={email} disabled />
          </div>
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        </div>
      )}
      {showToast && <div className="toast">Your changes have been saved</div>}
    </div>
  );
};

export default Profile;
