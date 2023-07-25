import React from 'react';
import {useEffect, useState} from "react";
import '../style/userListStyle.css';
import axios from "axios";

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [subs, setSubs] = useState([]);
    const [purchases, setPurchases] = useState([]);


    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch('/api/users');
                const userList = await response.json();
                setUsers(userList.users);
            } catch (error) {
                console.error(error);
            };
        
        }

        async function getAllSubs() {
            try {
                const response = await fetch('/api/subscriptions');
                const subsList = await response.json();
                setSubs(subsList.subs);
            } catch (error) {
                console.error(error);
            };
        
        }

        async function getAllPurchases() {
            try {
                const response = await fetch('/api/Purchases');
                const purchaseList = await response.json();
                setPurchases(purchaseList.purchases);
            } catch (error) {
                console.error(error);
            };
        
        }


        getUsers();
        getAllSubs();
        getAllPurchases();
    }, []);

    function openPopup() {
        document.getElementById("boxPopup").style.display = "block";
        }

    function closePopup() {
        document.getElementById("boxPopup").style.display = "none";
        }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        var modal = document.getElementById('boxPopup');
            if (event.target == modal) {
                closePopup();
            }
        }

    function openPopup2() {
        document.getElementById("boxPopup2").style.display = "block";
        }
    
    function closePopup2() {
        document.getElementById("boxPopup2").style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        var modal = document.getElementById('boxPopup' & 'boxPopup2');
            if (event.target == modal) {
                closePopup();
                closePopup2();
            }
        }

    const editUser = (user, id) => {
        axios
            .patch(
                `http://localhost:3001/api/users/editUser/`,
                user, id
              )
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const id = event.target.user_id;
        const nameFirst = event.target.children[1].value;
        const nameLast = event.target.children[2].value;
        const email = event.target.children[3].value;
        const phoneNumber = event.target.children[4].value;
        const accountStatus= event.target.children[6].value;
        const user = { first_name: nameFirst, last_name: nameLast, email: email, phone_number: phoneNumber, account_status: accountStatus };
        editUser(user, id);
      };
      const editSubs = (subs, id) => {
        axios
            .patch(
                `http://localhost:3001/api/subscriptions/editSubs/`,
                subs, id
              )
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
    };
      const handleSubmitSubs = (event) => {
        event.preventDefault();
        const user_id = event.target.childern[0].value;
        const make = event.target.children[1].value;
        const model = event.target.children[2].value;
        const subs = { user_id: user_id, make: make, model: model };
        editSubs(subs, id);
      };



    return (
        <>
            <h1 id="title">User List:</h1>
            {users.map((user, index) => {
                return(
                <div class="userListWrapper">
                    <div class="userInfo" key= {index} >
                    <h2>User Information</h2>
                        <p class="userText">ID: {user.user_id}</p>
                        <p class="userText">First Name: {user.first_name} </p>
                        <p class="userText">Last Name:  {user.last_name} </p>
                        <p class="userText">Phone Number: {user.phone_number} </p>
                        <p class="userText">Email: {user.email} </p>
                        <p class="userText">Account Status: {user.account_status}</p>
                        <div id="buttonWrapper">
                        <button class="openButton" onClick={() => openPopup()} value="open">Edit User</button>
                        <div id="boxPopup">
                            <form class="editUserForm" onSubmit={(event) => handleSubmit(event)}>
                                    User ID <input class="textInput" type="text" placeholder={user.user_id} name="userID"/>
                                    First Name <input class="textInput" type="text" placeholder={user.first_name} name="firstName"/>
                                    Last Name<input class="textInput" type="text" placeholder={user.last_name} name="lastName"/>
                                    Email <input class="textInput" type="text" placeholder={user.email} name="email"/>
                                    Phone Number <input class="textInput" type="text" placeholder={user.phone_number} name="phoneNumber"/>
                                    Account Status 
                                        <select id="accountStatus" placeholder={user.account_status} name="accountStatus">
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                    <option value="overdue">Overdue</option>
                                                </select>
                                <div id="editUserButtons">
                                    <button class="closeButton" onClick={() => closePopup()} value="close">Cancel</button>
                                    <button class="closeButton" onClick={() => closePopup()} type="submit" value="close" >Submit</button>
                                </div>
                            </form>
                        </div>
                        <button class="openButton" onClick={() => openPopup2()} value="open">Edit 
                        Subscription</button>
                        <div id="boxPopup2">
                            <form class="editUserForm" onSubmit={(event) => handleSubmitSubs(event)}>
                                    Subscription ID <input class="textInput" type="text" placeholder={subs. sub_id} name="subID"/>
                                    User ID <input class="textInput" type="text" placeholder={user.user_id} name="userID"/>
                                    Car Make <input class="textInput" type="text" placeholder={user.first_name} name="firstName"/>
                                    Car Model<input class="textInput" type="text" placeholder={user.last_name} name="lastName"/>
                                <div id="editUserButtons">
                                    <button class="closeButton" onClick={() => closePopup2()} value="close">Cancel</button>
                                    <button class="closeButton" onClick={() => closePopup2()} type="submit" value="close" >Submit</button>
                                </div>
                            </form>
                        </div>
                        </div> 
                    </div>
                    <div class="userPurchWrapper">
                    {subs.map((sub, indexSubs) => {
                        if (sub.user_id === user.user_id)
                            return(
                            <div class="subPurchWrapper">
                                <div class="userSubInfo" key= {indexSubs} >
                                    <h2>Subscription Information</h2>
                                    <p class="userText">Subscription ID: {sub.sub_id}</p>
                                    <p class="userText"> Make: {sub.make}</p>
                                    <p class="userText"> Model: {sub.model}</p>
                                </div>
                            {purchases.map((purch, indexPurch) => {
                                if (purch.sub_id === sub.sub_id)
                                    return(
                                    <div class="userPurchInfo" key= {indexPurch} >
                                        <h2>Purchase Information</h2>
                                        <p class="userText">Purchase Date: {purch.purchase_date}</p>
                                        <p class="userText">Purchase Price: ${purch.purchase_price}</p>
                                    </div>
                                    )
                            })}
                            </div>)
                    })}
                    </div>
                    
                </div>
                )}
            )}
        </>
    );
}

export default UserList;