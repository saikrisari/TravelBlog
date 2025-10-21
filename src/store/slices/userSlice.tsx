import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUserInfo } from "../../models/interfaces";

const savedUser = localStorage.getItem("user");

const initialState: IUserInfo = savedUser
  ? {
      ...JSON.parse(savedUser),
      isAuthenticated: !!localStorage.getItem("token"),
    }
  : {
      full_name: "",
      city: "",
      country: "",
      bio: "",
      photo: "",
      isAuthenticated: !!localStorage.getItem("token"),
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<Omit<IUserInfo, "isAuthenticated">>
    ) => {
      const { full_name, city, country, bio, photo } = action.payload;
      state.full_name = full_name;
      state.city = city;
      state.country = country;
      state.bio = bio;
      state.photo = photo;
      state.isAuthenticated = true;

      localStorage.setItem(
        "user",
        JSON.stringify({ full_name, city, country, bio, photo })
      );
    },

    logoutUser: (state) => {
      state.full_name = "";
      state.city = "";
      state.country = "";
      state.bio = "";
      state.photo = "";
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    updateUser: (state, action: PayloadAction<Partial<IUserInfo>>) => {
      Object.assign(state, action.payload);

      const newUser = {
        full_name: state.full_name,
        city: state.city,
        country: state.country,
        bio: state.bio,
        photo: state.photo,
      };

      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
