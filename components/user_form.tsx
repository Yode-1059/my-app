import classNames from "classnames";
import {
  getDownloadURL,
  uploadString,
  ref,
  deleteObject,
} from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { User } from "../types/user";
import ImageSelector from "./image_selector";
import { storage, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

function UserForm({ isEditMode }: { isEditMode: boolean }) {
  const { isLoading, fbUser, user } = useAuth();
  const router = useRouter();
  const isReady = router.isReady;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    reset,
  } = useForm<User>();

  useEffect(() => {
    if (isEditMode && user) {
      reset(user);
    }
  }, [isEditMode, user]);

  if (!isReady) {
    return null;
  }

  if (!isLoading) {
    if (!fbUser) {
      router.push("/login");
      return null;
    }
  }

  if (!fbUser) {
    if (!isLoading) {
      return null;
    } else {
      return;
    }
  }

  const submit = async (data: User) => {
    if (data && data.avatarURL?.match(/^data:/)) {
      const imgRef = ref(storage, `users/${fbUser.uid}/avatar`);
      await uploadString(imgRef, data.avatarURL, "data_url");
      data.avatarURL = await getDownloadURL(imgRef);
    }

    if (!data.avatarURL && user?.avatarURL) {
      const imgRef = ref(storage, `users/${fbUser.uid}/avatar`);
      await deleteObject(imgRef);
    }
    const documentRef = doc(db, `users/${fbUser.uid}`);
    return setDoc(documentRef, data).then(() => {
      alert(isEditMode ? "更新しました" : "ユーザーを作成しました");
      if (!isEditMode) {
        router.push("/");
      }
    });
  };

  return (
    <div className="container">
      {isEditMode ? <h1>プロフィール編集</h1> : <h1>アカウント作成</h1>}
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <h2 className="block mt-5">プロフィール画像</h2>
          <ImageSelector name="avatarURL" control={control} />
          <label className="block mt-5" htmlFor="name">
            名前*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-300"
            )}
            {...register("name", {
              required: "入力必至",
              maxLength: {
                value: 50,
                message: "50inai",
              },
            })}
            type="text"
            name="name"
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-red-500 mt-5">{errors.name?.message}</p>
          )}
        </div>
        <div>
          <label className="block mt-5" htmlFor="naem">
            ニックネーム*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-300"
            )}
            {...register("nickname", {
              required: "入力必至",
              maxLength: {
                value: 50,
                message: "50inai",
              },
            })}
            type="text"
            name="nickname"
            autoComplete="off"
          />
          {errors.nickname && (
            <p className="text-red-500 mt-5">{errors.nickname?.message}</p>
          )}
        </div>
        <div>
          <label className="block mt-5" htmlFor="naem">
            ぷろふ*
          </label>
          <textarea
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-300"
            )}
            {...register("profile", {
              required: "入力必至",
              maxLength: {
                value: 255,
                message: "255inai",
              },
            })}
            name="profile"
            id=""
            defaultValue=""
          />
          <p className="text-sm text-slate-400 leading-none mb-5">
            {watch("profile")?.length || 0}/255
          </p>
          {errors.profile && (
            <p className="text-red-500">{errors.profile?.message}</p>
          )}
          <Button disabled={isSubmitting}>
            {isEditMode ? "更新" : "アカウント作成"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
