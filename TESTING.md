#### Component test

Our group have four component tests, the first one is testing the app.js, the second one is testing the "register" component, the third one is testing the "login" component, the fourth one is testing the "creating new form" component, the fifth one is testing the "search results" component.

In the first test, we have tested that if our component has all right routes and the paths are all correct, it also should have a navbar in the top of the website.

In the second test, we have tested that if the register component has right number of buttons and if current component has correct slogan. Moreover, if user input the content in the register page's textfield part, the onChange function should be invoked successfully, and the related hook value should be changed successfully.

In the third test, we have tested if all the elements in current page are right. And we also have tested that if the login componet have textfield for users to input their email and password.

In the fourth test, we have tested the first step of our step form, in the first page of our step form, we have three buttons for user to choose the property type, and user can only choose one button at the same time. In the current page, also has a "NEXT" button go to the second page of step form, we have tested that if user donot choose any type, the website will should a alert message to notify him/her to choose one property type. Then we have tested that if user has choosed one type, when he/she click the "NEXT" button, the step form can change to the second page successfully.

In the fifth test, we have tested that if the "search result page" can show all results successfully, we display each result as a Card component from MUI, we assumed two situations, first one is that there only has one result in the results list, the second one is that there has two results in the result list, then we test that if the component can render the right number of cards.
