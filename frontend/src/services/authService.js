import API from "../api/api";

export const registerUser = async (data) => {
    const response = await API.post("auth/register/", data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await API.post("auth/login/", data);
    return response.data;
};

export const verifyEmail = async (token) => {
    const response = await API.get(`auth/verify-email/${token}/`);
    return response.data;
};

export const getProfile = async () => {
    const response = await API.get("auth/profile/");
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await API.put("auth/profile/", data);
    return response.data;
};

export const uploadProfileImage = async (file) => {
    
    const formData = new FormData();
    formData.append("profile_image", file);
    const response = await API.post("auth/profile/upload-image/", formData,
        {
            headers: {"Content-Type": "multipart/form-data"},
        }
    );

    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await API.post("auth/forgot-password/", {email});
    return response.data;
};

export const resetPassword = async (token, password, confirm_password) => {

    const response = await API.post(`auth/reset-password/${token}/`,
        {
            password,
            confirm_password,
        }
    );

    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};