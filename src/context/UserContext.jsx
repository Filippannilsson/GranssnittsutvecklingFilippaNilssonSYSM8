import { createContext, useState, useContext, useEffect } from "react";
import { getUsers, createUser } from "../services/api";

//Skapa context
const UserContext = createContext();

//UserProvider som skickar data till alla children med user-data
export function UserProvider({ children }) {
  //State för användaren, ladda från localStorage eller null
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("droneDelightsUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error loading user", error);
      return null;
    }
  });

  //Spara till localStorage när userItem ändras
  useEffect(() => {
    try {
      //Om inloggad användare
      if (user) {
        //Spara i localStorage så användaren förblir inloggad vid refresh
        localStorage.setItem("droneDelightsUser", JSON.stringify(user));
      } else {
        //Om utloggning eller aldrig inloggad, ta bort data från localStorage
        localStorage.removeItem("droneDelightsUser");
      }
    } catch (error) {
      console.error("Error saving user to localStorage", error);
    }
  }, [user]);

  //Funktion för att logga in användare
  async function loginUser(email, password) {
    try {
      const users = await getUsers();

      //Hitta rätt användare från databasen genom att jämföra mail och lösen
      const currentUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (currentUser) {
        setUser(currentUser); //Logga in användaren
        console.log("Login successful:", currentUser);
        return { success: true, user: currentUser };
      } else {
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Login failed, please try again." };
    }
  }

  //Funktion för att registrera användare
  async function registerUser(userData) {
    try {
      //Kolla om mail redan finns i databasen
      const users = await getUsers();

      //Sök igenom alla users för att se om samma mail redan finns
      const existingUser = users.find((u) => u.email === userData.email);

      //Avbryt registrering om mail redan finns
      if (existingUser) {
        return { success: false, error: "Email already exists" };
      }

      const createdUser = await createUser(userData);

      setUser(createdUser); //Logga in användaren direkt
      console.log("Registration successful:", createdUser);
      return { success: true, user: createdUser };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Registration failed, try again" };
    }
  }

  //Funktion för att logga ut en användare
  function logoutUser() {
    setUser(null);
    console.log("User logged out");
  }

  //Funktion för att kontrollera om användare är inloggad
  function isLoggedIn() {
    return user !== null;
  }

  //Alla värden som ska delas med andra components
  const contextValue = {
    user,
    loginUser,
    registerUser,
    logoutUser,
    isLoggedIn,
  };

  //Ge alla children tillgång till contextValue
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

//Custom hook för att använda context
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export default UserContext;
