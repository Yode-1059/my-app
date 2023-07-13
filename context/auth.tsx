import {
  Unsubscribe,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase/firebase";
import { User } from "../types/user";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

type ContextType = {
  fbUser: User | null | undefined;
  isLoading: boolean;
  user: User;
};

const AuthContext = createContext<ContextType>({
  fbUser: undefined,
  isLoading: true,
  user: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [fbUser, setFbUser] = useState<any | null>();
  useEffect(() => {
    let unsubribe: Unsubscribe;
    onAuthStateChanged(auth, (resultUser) => {
      unsubribe?.();
      setFbUser(resultUser);

      if (resultUser) {
        setIsLoading(true);
        const ref = doc(db, `users/${resultUser.uid}`);
        unsubribe = onSnapshot(ref, (snap) => {
          setUser(snap.data() as User);
          setIsLoading(false);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, fbUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
