# Chatter

This project was created using an Expo managed project, which utilizes Firebase. Log-in verification is achieved using Firebase Authentication. The images chosen for profile pictures and those shared in the chats are stored in Firebase Storage. Firestore Database was also used for storing user information and information about created chats.

---

### On Boarding Screens

<p>
  <img src="./Screenshots/OnBoarding1.PNG" alt="Screen 1" height="500">
  <img src="./Screenshots/OnBoarding2.PNG" alt="Screen 2" height="500">
  <img src="./Screenshots/OnBoarding3.PNG" alt="Screen 3" height="500">
</p>

Users will be presented with onboarding screens upon the initial launch of the Chatter application on their device. These screens introduce users to the features of Chatter.

---

### Log In Screen
<p>
  <img src="./Screenshots/Login1.PNG" alt="Login" height="500">
  <img src="./Screenshots/Login2.PNG" alt="Login" height="500">
</p>

Users are required to log in using phone number verification. The country picker is used to allow users to select their country and obtain the corresponding country code.

---

### Set Up Screen

<p>
  <img src="./Screenshots/SetUp1.PNG" alt="Profile" height="500">
  <img src="./Screenshots/SetUp2.PNG" alt="Chats" height="500">
</p>

New users will be greeted with the setup screen, which prompts for a required account name and an optional profile picture. Users will have the option to either take a new picture for the profile or choose one from their media library.

---

### Home Screen

<p>
  <img src="./Screenshots/Profile.PNG" alt="Profile" height="500">
  <img src="./Screenshots/Chats.PNG" alt="Chats" height="500">
</p>

The home screen contains two tabs: the profile screen and the chats screen. The profile screen displays the user's account name and profile picture and provides a sign-out button for logging out of the application. On the other hand, the chats screen showcases the created chats between the user and other participants. Each chat displays information about the other participant, including their profile picture and contact name. Additionally, a preview and the date of the last message are shown for each chat. Clicking on any chat opens up the chat room with the corresponding participant. In the bottom right corner of the chats screen, a floating icon is located. When pressed, this icon navigates the user to the contacts screen.

---

### Contacts Screen

<img src="./Screenshots/Contacts.PNG" alt="Contacts" height="500">

The contacts screen retrieves contacts from the device's contact list as well as from the database. Each contact is displayed with the profile picture chosen by the specific user and the name as it appears in the device's contact list. Clicking on a contact will either open an existing chat with the corresponding user or create a new chat if the chat has not been previously created.

---

### Chat Screen

<p>
  <img src="./Screenshots/Chat1.PNG" alt="Chat" height="500">
   <img src="./Screenshots/Chat2.PNG" alt="Chat" height="500">
</p>

The chat screen displays the conversation between two users. Similar to the contacts screen, the chat header shows the profile picture and contact name of the other user. Users can send messages and share pictures in real-time.
