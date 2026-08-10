import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import { getProfile, updateProfile, uploadProfileImage } from "../services/authService";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, User, Shield, Save, Camera } from "lucide-react";

import { useUser } from "../context/UserContext";

import Loader from "../components/Loader";
import { toast } from "sonner";

import { Helmet } from "react-helmet-async";

function Profile() {

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_image: "",
  });

  const { setUser } = useUser();

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();

        setProfile(data);
        setUser(data);

        if (data.profile_image) {
          setPreview(data.profile_image);
        }
      } 
      catch (err) {
        console.error(err);
        toast.error("Unable to load profile.");
      } 
      finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [setUser]);

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    setSaving(true);

    try {
      const data = await updateProfile(profile);

      setProfile(data);
      setUser(data);

      toast.success("Profile updated successfully.");
    } 
    catch (err) {
      toast.error(
        err.response?.data?.detail ||
          "Unable to update profile."
      );
    } 
    finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");

      e.target.value = "";
      return;
    }

    setPreview(URL.createObjectURL(file));

    setUploading(true);

    try {
      const data = await uploadProfileImage(file);

      const updatedUser = {
        ...profile,
        profile_image: data.profile_image,
      };

      setProfile(updatedUser);

      setUser(updatedUser);

      setPreview(data.profile_image);

      toast.success(
        "Profile image updated successfully."
      );
    } 
    catch (err) {
      toast.error(
        err.response?.data?.detail ||
          "Unable to upload image."
      );
    } 
    finally {
      e.target.value = "";
      setUploading(false);
    }
  }

if (loading) {
  return (

    <DashboardLayout>
      <Loader />
    </DashboardLayout>

  );
}

return (
  <>

    <Helmet>
      <title>Profile | Spendora</title>

      <meta
        name="description"
        content="Manage your Spendora profile."
      />
    </Helmet>

    <DashboardLayout>

      <div className="mx-auto w-full max-w-5xl">
        <Card className="overflow-hidden rounded-3xl border bg-card shadow-xl">

          <div className="relative h-32 overflow-hidden rounded-t-3xl bg-gradient-to-r from-zinc-900 via-neutral-900 to-zinc-800 sm:h-36 md:h-44">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_40%)]"/>
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/5 blur-3xl"/>
            <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-white/5 blur-3xl"/>
            <div className="absolute bottom-0 left-0 h-px w-full bg-white/10"/>

          </div>


          <CardContent className="relative px-4 pb-6 sm:px-6 sm:pb-8 md:px-10 md:pb-10">

              <div
                className="
                  -mt-10
                  flex
                  flex-col
                  items-center
                  rounded-3xl
                  bg-background/90
                  p-4
                  shadow-lg
                  backdrop-blur-md
                  sm:-mt-12
                  sm:p-5
                  md:-mt-14
                  md:p-6
                "
              >

              <div className="relative">

                  <div
                    className="
                      flex
                      h-26
                      w-26
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      border-[5px]
                      border-background
                      bg-primary
                      shadow-xl
                      sm:h-28
                      sm:w-28
                      md:h-32
                      md:w-32
                      md:border-[6px]
                    "
                  >

                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span
                        className="
                          text-4xl
                          font-bold
                          text-primary-foreground
                          md:text-5xl
                        "
                      >
                        {profile.first_name
                          ? profile.first_name
                              .charAt(0)
                              .toUpperCase()
                          : "U"}
                      </span>
                    )}

                  </div>

                  <label
                    htmlFor="profileImage"
                    className="
                      absolute
                      bottom-0
                      right-0
                      flex
                      h-9
                      w-9
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      text-primary-foreground
                      shadow-lg
                      transition
                      hover:scale-105
                      md:bottom-1
                      md:right-1
                      md:h-10
                      md:w-10
                    "
                  >
                    <Camera
                      size={17}
                      className="md:h-[18px] md:w-[18px]"
                    />
                  </label>


                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    hidden
                    aria-label="Upload profile image"
                    onChange={handleImageUpload}
                  />

                </div>

                {uploading && (
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    Uploading image...
                  </p>
                )}

                <h1
                  className="
                    mt-4
                    text-center
                    text-2xl
                    font-bold
                    leading-tight
                    sm:text-3xl
                  "
                >
                  {profile.first_name}{" "}
                  {profile.last_name}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  @{profile.username}
                </p>

              </div>

              <div
                className="
                  mt-7
                  grid
                  gap-6
                  md:mt-10
                  md:grid-cols-2
                  md:gap-8
                "
              >

                <div className="space-y-2">

                  <Label className="flex items-center gap-2 font-medium">
                    <User size={16} />

                    First Name
                  </Label>

                  <Input
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                  />

                </div>              

                <div className="space-y-2">

                  <Label className="flex items-center gap-2 font-medium">
                    <User size={16} />

                    Last Name
                  </Label>

                  <Input
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                  />

                </div>       

                <div className="space-y-2">

                  <Label className="flex items-center gap-2 font-medium">
                    <Mail size={16} />

                    Email Address
                  </Label>

                  <Input
                    value={profile.email}
                    readOnly
                    className="
                      h-12
                      cursor-not-allowed
                      rounded-xl
                      bg-muted
                      opacity-90
                    "
                  />

                </div>

                <div className="space-y-2">

                  <Label className="flex items-center gap-2 font-medium">
                    <Shield size={16} />

                    Username
                  </Label>

                  <Input
                    value={profile.username}
                    readOnly
                    className="
                      h-12
                      cursor-not-allowed
                      rounded-xl
                      bg-muted
                      opacity-90
                    "
                  />

                </div>

              </div>

              <div
                className="
                  mt-7
                  border-t
                  pt-6
                  md:mt-10
                  md:pt-8
                "
              >

                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="
                    h-12
                    w-full
                    rounded-xl
                    text-base
                    font-semibold
                    shadow-md
                  "
                >

                  {!saving && (
                    <Save className="mr-2 h-5 w-5" />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </Button>

              </div>

            </CardContent>

          </Card>
        </div>

      </DashboardLayout>

  </>
);

}

export default Profile;