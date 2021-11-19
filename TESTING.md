#### Component test

Our group have four component tests, the first one is testing the app.js, the second one is testing the "register" component, the third one is testing the "login" component, the fourth one is testing the "creating new form" component, the fifth one is testing the "search results" component.

In the first test, we have tested that if our component has all right routes and the paths are all correct, it also should have a navbar in the top of the website.

In the second test, we have tested that if the register component has right number of buttons and if current component has correct slogan. Moreover, if user input the content in the register page's textfield part, the onChange function should be invoked successfully, and the related hook value should be changed successfully.

In the third test, we have tested if all the elements in current page are right. And we also have tested that if the login componet have textfield for users to input their email and password.

In the fourth test, we have tested the first step of our step form, in the first page of our step form, we have three buttons for user to choose the property type, and user can only choose one button at the same time. In the current page, also has a "NEXT" button go to the second page of step form, we have tested that if user donot choose any type, the website will should a alert message to notify him/her to choose one property type. Then we have tested that if user has choosed one type, when he/she click the "NEXT" button, the step form can change to the second page successfully.

In the fifth test, we have tested that if the "search result page" can show all results successfully, we display each result as a Card component from MUI, we assumed two situations, first one is that there only has one result in the results list, the second one is that there has two results in the result list, then we test that if the component can render the right number of cards.

#### UI test

*** Happy path test one
    In the UI test section, we tested two separate happy paths, the first one following the gulidline in GitLab, but we made some modifications to make the path more complete. The details of the operation are as follows. We assume the database was empty and then do this test. So before testing, you had better reset your database.
    1.	Registers successfully
    2.	Log out
    3.	Log in
    4.	Creates a new listing successfully
    5.	Updates the thumbnail and title of the listing successfully
    6.	Publish a listing successfully
    7.	Unpublish a listing successfully
    8.	Before booking, there should be publised room, so we do publish again.
    9.	You can't book your own house, so we create a new account and then use it to log in
    10.	Make a booking successfully
    11.	Logs out of the application successfully
    12.	Logs back into the application successfully
*** Happy path test two
    For the second test we tested a new route, but we kept the registration test and other creating test, so that the test would be more complete. In this test we first register the host's account and use this to log in, then create a new listing and publish it. We then register a guest account and use this to book the listing. Then we use the owner's account to log in and check all the listings that have been posted, check the status of the booking by guest, and accept the bookings. The landlord can then check the profit of this booking. The details of how this works are as follows. The path we are testing is as if the database is empty. So before testing, you need to empty your database.
    1.	Registers successfully (Now, you are host)
    2.	Log out
    3.	Log in
    4.	Creates a new listing successfully
    5.	Publish a listing successfully
    6.	You can't book your own house, so we create a new account and then use it to log in. (Now, you are guest)
    7.	Make a booking successfully
    8.	Logs out and  Use host account number to login. (Now, you are host)
    9.	Check all Hosted Listings 
    10. Check one of hosted listing and check its booking statue.
    11. Accept the this booking
    12. Check profit of this booking
