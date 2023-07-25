import React from 'react';
import "../style/PortalHome.css";

const PortalHome = () => {
    return (
        <>
            <div id="homeWrapper">
                <h1 id="titleHome">Portal Home</h1>
                <article id="portalHomePage">
                    <section class="homeSections">
                        <h2>User List</h2>
                        <p class="sectionContent">If you click on "User List" at the top of the page you can access a list of all users. Within the user lists you can see all subscriptions, purchases, and user information for each subscriber.</p>
                    </section>
                    <section class="homeSections">
                        <h2>Add Subscriber</h2>
                        <p class="sectionContent">If someone needs to sign up for a subscription, you can add them through the "Add Subscriber" page. On the page you'll be presented with a form that asks for their infromation and they'll be added as a user. </p>
                    </section>
                    <section class="homeSections">
                        <h2>Search Users</h2>
                        <p class="sectionContent">If you're unable to find a user on the User List page, you can search their phone number in the "Search Users" page. Each user has a unique phone number and should should allow you to pull up all their relevant information, and you can edit any information you need to within the search page as you do in the User List page.</p>
                    </section>
                </article>
            </div>
        </>
    );
}

export default PortalHome;