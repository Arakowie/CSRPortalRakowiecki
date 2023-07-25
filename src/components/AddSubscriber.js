import React from 'react';
import {useEffect, useState} from "react";
import '../style/addSubscriber.css';

const AddSubscriber = () => {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [car_make, setCarMake] = useState("");
    const [car_model, setCarModel] = useState("");
    const [subs, setSubs] = useState("");
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);

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

    useEffect(() => {

        getUsers();
        getAllSubs();
    }, []);

    async function handleSubmit(e) {
        // e.preventDefault();
        setError("");
        let inputID
        let inputSubID

        const response = await fetch('api/users/createUser', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                first_name,
                last_name,
                phone_number,
                email, 
                password
            }),
        });

        getUsers();

        {users.map((user, index) => {
            if(user.phone_number === phone_number){
                inputID = user.user_id
                }
            })};
        
        const response2 = await fetch('api/subscriptions/createSub', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    inputID,
                    car_make,
                    car_model
                }),
            });

        getAllSubs();

        {subs.map((sub, index) => {
            if(sub.user_id === inputID){
                inputSubID = sub.user_id
                }
            })};

        const response3 = await fetch('api/purchases/createPurchase', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    inputSubID,
                    purchase_date,
                    purchase_price
                }),
            });
    };

    return(
        <div id="addSubs">
            <form class="addSubsForm" onSubmit={(event) => handleSubmit(event)}>
                <ul id="subsList">Add Subscriber
                    <li id="listItem">First Name: <input class="textInput" type="text" placeholder="First Name" name="firstName" onChange={(e) => setFirstName(e.target.value)}/></li>
                    <li id="listItem">Last Name:<input class="textInput" type="text" placeholder="Last Name" name="lastName"onChange={(e) => setLastName(e.target.value)}/></li>
                    <li id="listItem">Email:<input class="textInput" type="text" placeholder="email@google.com" name="email" onChange={(e) => setEmail(e.target.value)} /></li>
                    <li id="listItem">Phone Number:<input class="textInput" type="text" placeholder="123-123-1234" name="phoneNumber"
                                    onChange={(e) => setPhoneNumber(e.target.value)}/></li>
                    <li id="listItem">Car Make:<input class="textInput" type="text" placeholder="Honda, etc." name="carMake" onChange={(e) => setCarMake(e.target.value)}/></li>
                    <li id="listItem">Car Model:<input class="textInput" type="text" placeholder="Civic, etc." name="carModel" onChange={(e) => setCarModel(e.target.value)}/></li>
                                    {/* <li>Subscription ID:<input class="textInput" type="number" placeholder="0000001" name="subId"
                                    onChange={(e) => setSubID(e.target.value)}/></li> */}
                    </ul>
                    <div id="addSubsButtons">
                        <button class="submitButton" type="submit" >Submit</button>
                    </div>
            </form>
            <div>
                <p>{error}</p>
            </div>
    </div> 
    )

}

export default AddSubscriber;