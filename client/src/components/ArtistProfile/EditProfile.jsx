import React, { useState, useContext } from 'react';
import NavBar from '../NavBar/Navbar';
import './EditProfile.css';
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [formData, setFormData] = useState('');
  const history = useHistory();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch('/api/users/edit-profile', formData);
      sessionStorage.setItem('user', response.data);
      setCurrentUser(response.data.user);
      console.log(response.data);
      history.push('/profile');
    } catch (error) {
      swal('SignUp Error: ', error.toString());
    }
  };

  const handleDelete = async () => {
    try {
      const willDelete = await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this account!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      });
      if (willDelete) {
        try {
          await axios({
            method: 'DELETE',
            url: '/api/users',
            withCredentials: true
          });
          swal('Poof! Your account has been deleted!', {
            icon: 'success'
          });
          sessionStorage.removeItem('user');
          setCurrentUser(null);
          history.push('/');
        } catch (error) {
          swal(`Oops!`, 'Something went wrong.');
        }
      } else {
        swal('Your account is safe!');
      }
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="editprofile">
        <div className="leftside">
          <ul>
            <li>
              <img
                alt="User"
                className="be6sR"
                src={
                  preview ||
                  currentUser?.avatar ||
                  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                }
              />
            </li>
            <li>
              <form onSubmit={handleAvatar}>
                <input
                  type="file"
                  accept="image/*"
                  className="Resetbtn"
                  onChange={handleImageSelect}
                />
                <br />
                <button type="submit">submit</button>
              </form>
            </li>
            <li>
              <button type="submit" className="Resetbtn">
                Reset Password
              </button>
            </li>
            <li>
              <button
                type="submit"
                className="Deletebtn"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </li>
          </ul>
        </div>

        <div className="rightside">
          <div className="topdiv">
            <h1 className="basicinfo">Basic Info</h1>
            <button className="topbtns" onSubmit={handleEditProfile}>
              Save
            </button>
            <button className="topbtnc">Cancel</button>
          </div>
          <form onSubmit={handleEditProfile}>
            <div className="ruly">
              <div className="myfname">
                <label>Artist Name</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="e.g. JohnRoss"
                  name="artistName"
                  onChange={handleChange}
                />
              </div>

              <div className="myfname">
                <label>First Name</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder=" e.g. John"
                  name="firstName"
                  onChange={handleChange}
                />
              </div>

              <div className="myfname">
                <label>Last Name</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="e.g. Ross"
                  name="lastName"
                  onChange={handleChange}
                />
              </div>

              <div className="myfname">
                <label>Email</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="e.g. JohnRoss@gmail.com"
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div className="myfname">
                <label>Social Media</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="@JohnRoss"
                  name="socialMedia"
                  onChange={handleChange}
                />
              </div>

              <div className="myfname">
                <label>About Me</label>
              </div>
              <div>
                <textarea
                  type="text"
                  placeholder="Write about yourself"
                  name="bio"
                  onChange={handleChange}
                />
              </div>

              <div className="myfname">
                <label>Current Projects</label>
                <ul>
                  <li className="plist">
                    {' '}
                    <input
                      type="URL"
                      placeholder="Project 1"
                      onChange={handleChange}
                    />
                  </li>
                  <li className="plist">
                    {' '}
                    <input
                      type="URL"
                      placeholder="Project 2"
                      onChange={handleChange}
                    />
                  </li>
                  <li className="plist">
                    {' '}
                    <input
                      type="URL"
                      placeholder="Project 3"
                      onChange={handleChange}
                    />
                  </li>
                  <li className="plist">
                    {' '}
                    <input
                      type="URL"
                      placeholder="Project 4"
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </div>
              <div className="myfname">
                <label>My Music</label>
                <ul>
                  <li className="plist">
                    {' '}
                    <input
                      type="URL"
                      placeholder="Song 1"
                      onChange={handleChange}
                    />
                  </li>
                  <li className="plist">
                    {' '}
                    <input
                      type="URL"
                      placeholder="Song 2"
                      onChange={handleChange}
                    />
                  </li>
                  <li className="plist">
                    {' '}
                    <input
                      type="URL"
                      placeholder="Song 3"
                      onChange={handleChange}
                    />
                  </li>
                  <li className="plist">
                    {' '}
                    <input
                      type="URL"
                      placeholder="Song 4"
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </div>
              <div className="lower">
                <button className="topbtns" onSubmit={handleEditProfile}>
                  Save
                </button>
                <button className="topbtnc">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
