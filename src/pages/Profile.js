import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../components/SideMenu';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setFormData({
          name: data.name,
          email: data.email,
          gpa: data.gpa,
          credits: data.credits,
        });
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const parsedValue = name === 'gpa' || name === 'credits' ? parseFloat(value) || 0 : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const saveChanges = async () => {
    try {
      const user = auth.currentUser;
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, formData);
      setUserData(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-primary p-4 flex items-center">
        <SideMenu />
        <h1 className="text-secondary text-xl ml-4">Profile</h1>
      </nav>

      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto bg-secondary p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-primary mb-4">Profile Details</h2>

          {isEditing ? (
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="gpa" className="mb-1 font-medium text-gray-700">GPA</label>
                <input
                  type="number"
                  step="0.1"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa || 0}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your GPA"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="credits" className="mb-1 font-medium text-gray-700">Credits</label>
                <input
                  type="number"
                  id="credits"
                  name="credits"
                  value={formData.credits || 0}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your credits"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={saveChanges}
                  className="w-full bg-primary text-secondary py-2 rounded hover:bg-white hover:text-primary border"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>KnightCoin Balance:</strong> {userData.amount}</p>
              <p><strong>GPA:</strong> {userData.gpa}</p>
              <p><strong>Credits:</strong> {userData.credits}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-primary text-secondary py-2 rounded mt-4 hover:bg-white hover:text-primary border"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
