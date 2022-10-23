import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { ReactElement, useState, useEffect } from "react";
import { auth, db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./Register.scss";
import { authErrors } from "./../../models/error";
import { useAlert } from "react-alert";
import { IRegister } from "../../models/models";
import { Loading } from "../../components/Loading";

const REGISTER_INITIAL_VALUE: IRegister = {
  displayName: "",
  email: "",
  password: "",
  userImage: null
}

export const Register: React.FC = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const [ register, setRegister ] = useState<IRegister>(REGISTER_INITIAL_VALUE);
  const navigate = useNavigate();
  const [ preview, setPreview ] = useState<string>("");

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const { displayName, email, password, userImage } = register;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();

      const storageRef = ref(storage, `/users/${res.user.uid}/${displayName + date}`);

      console.log(storageRef)

      await uploadBytesResumable(storageRef, userImage).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");

          } catch (err: any) {
            console.log("Erro ao fazer upload ad foto");
            console.log(err)
            alert.error(authErrors[err?.code?.replace("auth/", "")]);
            setLoading(false);
          }
        });
      });
    } catch (err: any) {
      console.log("erro ao tentar registro")
      console.log(err)
      alert.error(authErrors[err?.code?.replace("auth/", "")]);
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files === null) return;
    const file = e.target.files[0];
    setRegister({...register, userImage: file})
  }

  useEffect(() => {
    if (!register.userImage) {setPreview(""); return};
    // create the preview
    const objectUrl = URL.createObjectURL(register.userImage);

    setPreview(objectUrl);
 
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);

  }, [register.userImage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({...register, [e.target.name]: e.target.value})
  }

  if (loading) {
    return <Loading />
  } else {
    return (
      <div className="form-container register">
        <div className="form-wrapper">
          <div className="top-text register">
            <span className="logo">Create New Account</span>
            <span className="title">Please fill the form!</span>
          </div>
          <form onSubmit={handleSubmit}>
            <input 
              required type="text" placeholder="Display Name" 
              value={register.displayName}  name="displayName"  
              onChange={e => handleChange(e)}
            />
            <input 
              required type="email"   placeholder="Email"        
              value={register.email}  name="email"        
              onChange={e => handleChange(e)}
            />
            <input 
              required type="password"  
              placeholder="Password" value={register.password}     
              name="password" onChange={e => handleChange(e)}
            />
            <input required style={{ display: "none" }} type="file" id="file"  onChange={(e) => handleFileChange(e)}/>
            <label htmlFor="file">
              { !register.userImage && 
                <>
                  <img src="images/addAvatar.png" alt="" />
                  <span>Add an avatar</span>
                </>
              }
              {preview && 
                <>
                  <img src={preview} className="user-image-preview" />
                  <span>This is how your avatar will look</span>
                </>
              }
            </label>
            <button disabled={loading}>Sign up</button>
          </form>
          <p>
            You do have an account?{" "}
            <Link to="/login" className="link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    );
  }
};
