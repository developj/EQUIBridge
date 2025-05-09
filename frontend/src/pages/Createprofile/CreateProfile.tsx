import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import Footer from "../../components/Footer";
import { Textarea } from "../../components/ui/textarea";
import { useUpdateProfile } from "../../api/hooks/useUpdateProfile";
import { useChat } from "../../api/hooks/useChat";
import { downloadResume } from "../../api/api";
import { useProfile } from "../../api/hooks/useProfile";
// import { useAdzunaJobsMutation } from "../../api/hooks/useAdzunaJobsMutation";
import { ExtendedProfileData } from "../../api/interface";

const CreateProfile = () => {
  const { data: user, isLoading, isError } = useProfile();
  console.log(isLoading,isError);
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const { mutate, isPending } = useUpdateProfile();
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [isGeneratingCareers, setIsGeneratingCareers] = useState(false);
  const mutateChat = useChat();

  const [formData, setFormData] = useState<ExtendedProfileData>({
    first_name:  "",
    last_name: "",
    email: "",
    experience: "",
    linkedin: "",
    bio: "",
    interests: "",
    preferred_industries: "",
    education: "",
    employment: "",
    income: "",
    is_single_parent: false,
    has_disability: false,
    accessibility_requirements: "",
    opportunity_preferences: [] as string[],
    preferred_work_format: [] as string[],
    languages: "",
    devices: [] as string[],
  });

  useEffect(() => {
    const saved = localStorage.getItem("draftSkills");
    if (saved) setSkills(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("draftSkills", JSON.stringify(skills));
  }, [skills]);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();

      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };
  
  // const mutateAzuna = useAdzunaJobsMutation();

  useEffect(()=>{
   if(user){
    setFormData(user)
    setSkills(user?.skills || [])
   }
  },[user])

  // const sampleJobAdzunaParams = {
  //   query: "health worker",
  //   location: "usa",
  //   results_per_page: 50,
  //   page: 1,
  // };



  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const payload = useMemo(
    () => ({
      ...formData,
      skills,
    }),
    [formData, skills] 
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(payload, {
      onSuccess: () => {
        localStorage.removeItem("draftSkills");
      },
      onError: (err) => {
        console.error("Profile update failed:", err);
      },
    });
  };

  const onRefineBio =async () => {
  setIsGeneratingBio(true);
   await mutate(payload); //update profile
   const response =  await mutateChat.mutateAsync({ message: boiPrompt(formData.bio) });
   setIsGeneratingBio(false)
   setFormData((prev) => ({
    ...prev,
    bio: response.reply,
  }))
  };

  const onRefineCareer =async () => {
    await mutate(payload); //update profile
    setIsGeneratingCareers(true);
    const response =  await mutateChat.mutateAsync({ message: boiPrompt(formData.interests) });
    setIsGeneratingCareers(false);
    setFormData((prev) => ({
     ...prev,
     interests: response.reply,
   }))
   };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">
                Create Your Profile
              </CardTitle>
              <CardDescription>
                Help us connect you to inclusive and empowering opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center">
                <Button
                    disabled={!user?.bio}
                    onClick={() => navigate("/opportunities")}
                    className="bg-[var(--equipurple)]
                    hover:bg-purple-600 cursor-pointer"
                  >
                    Explore Opportunities
                  </Button>
                </div>
                {/* Personal Information */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="pb-2">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        required
                        value={formData?.first_name}
                        placeholder={user?.first_name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            first_name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="pb-2">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        required
                        value={formData?.last_name}
                        placeholder={user?.last_name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            last_name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="pb-2">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        disabled
                        required
                        value={user?.email}
                        placeholder={user?.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience" className="pb-2">
                        Experience Level
                      </Label>
                      <Input
                        id="experience"
                        placeholder="e.g., Beginner"
                        value={formData.experience}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            experience: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin" className="pb-2">
                        LinkedIn / Portfolio
                      </Label>
                      <Input
                        id="linkedin"
                        placeholder="https://yourportfolio.com"
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            linkedin: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio" className="pb-2">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      required
                      placeholder="Tell us about your background, interests, or goals"
                      value={formData.bio}
                      rows={8}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                    />
                    <div className="flex justify-end">
                      <Button
                        disabled={isGeneratingBio}
                        size={"sm"}
                        onClick={(e) => {
                          e.preventDefault();
                          onRefineBio();
                        }}
                        className="bg-[var(--equipurple)] mt-2 px-4 hover:bg-purple-600 text-white rounded-md cursor-pointer"
                      >
                        refine with ai
                      </Button>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <Label className="">Add skills (press Enter to add)</Label>
                  <Input
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="e.g., Cooking, Sales"
                  />
                  <div className="flex flex-wrap gap-2 ">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                  <Label>Or select soft skills:</Label>
                  <div className="flex flex-wrap gap-2 ">
                    {["Teamwork", "Empathy", "Adaptability"].map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                          if (!skills.includes(skill))
                            setSkills([...skills, skill]);
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>

                {/* Interests / Career Goals */}
                <section className="space-y-1">
                  <h3 className="text-lg mb-2 font-semibold ">
                    Interests / Career Goals
                  </h3>
                  <Textarea
                    className="min-h-16"
                    placeholder="e.g., Remote work, NGO work, Entrepreneurship"
                    value={formData.interests}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        interests: e.target.value,
                      }))
                    }
                  />
                  <div className="flex justify-end">
                    <Button
                      disabled={isGeneratingCareers}
                      onClick={(e) => {
                        e.preventDefault();
                        onRefineCareer();
                      }}
                      size={"sm"}
                      className="bg-[var(--equipurple)] mt-1 px-4 hover:bg-purple-600 text-white rounded-md cursor-pointer"
                    >
                      refine with ai
                    </Button>
                  </div>

                  <Label className="mb-2" htmlFor="preferredIndustries">
                    Preferred Industries (optional)
                  </Label>
                  <Input
                    id="preferredIndustries"
                    placeholder="e.g., tech, healthcare"
                    value={formData?.preferred_industries}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        preferred_industries: e.target.value,
                      }))
                    }
                  />
                </section>

                {/* Background Context */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Background Context</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="education" className="pb-2">
                        Level of Education
                      </Label>
                      <select
                        id="education"
                        className="w-full border p-2 rounded-md"
                        value={formData.education}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            education: e.target.value,
                          }))
                        }
                      >
                        <option>No formal education</option>
                        <option>Primary</option>
                        <option>Secondary</option>
                        <option>Tertiary</option>
                        <option>Vocational</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="employment" className="pb-2">
                        Current Employment Status
                      </Label>
                      <select
                        id="employment"
                        className="w-full border p-2 rounded-md"
                        value={formData.employment}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            employment: e.target.value,
                          }))
                        }
                      >
                        <option>Unemployed</option>
                        <option>Informally employed</option>
                        <option>Part-time</option>
                        <option>Full-time</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Accessibility Needs */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Accessibility & Disability
                  </h3>
                  <div>
                    <Label className="pb-2">
                      Do you identify as having a disability?
                    </Label>
                    <select
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={formData.has_disability ? "yes" : "no"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          has_disability: e.target.value === "yes",
                        }))
                      }
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="accessibilityRequirements" className="pb-2">
                      Accessibility Requirements (optional)
                    </Label>
                    <Textarea
                      id="accessibilityRequirements"
                      className="min-h-16"
                      placeholder="e.g., screen reader compatible"
                      value={formData.accessibility_requirements}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          accessibility_requirements: e.target.value,
                        }))
                      }
                    />
                  </div>
                </section>

                {/* Languages & Devices */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Languages & Devices</h3>
                  <Label htmlFor="languages">Languages Spoken</Label>
                  <Input
                    id="languages"
                    placeholder="e.g., English, French, Spanich, Chinese"
                    value={formData.languages}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        languages: e.target.value,
                      }))
                    }
                  />
                  <Label>Access to Devices</Label>
                  <div className="space-y-1">
                    {[
                      "I own a smartphone",
                      "I have regular internet access",
                      "I can access a laptop or desktop computer",
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData?.devices?.includes(
                            "I own a smartphone"
                          )}
                          onChange={(e) => {
                            const value = "I own a smartphone";
                            setFormData((prev) => ({
                              ...prev,
                              devices: e.target.checked
                                ? [...(prev.devices || []), value]
                                : prev?.devices?.filter((v) => v !== value),
                            }));
                          }}
                        />

                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!user?.bio}
                    onClick={() => navigate("/opportunities")}
                    className="bg-[var(--equipurple)]
                    hover:bg-purple-600 cursor-pointer"
                  >
                    Explore Opportunities
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[var(--equipurple)]
                    hover:bg-purple-600 cursor-pointer"
                  >
                    {isPending ? "Creating profile..." : user?.bio? "Update Profile" : " Create Profile"}
                  </Button>
                  <Button
                    disabled={!user?.bio}
                    onClick={async (e) => {
                      e.preventDefault();
                      await downloadResume();
                    }}
                    className="z-10 cursor-pointer" /* make sure it sits above the tooltip’s invisible area */
                  >
                    Download CV
                  </Button>
                </div>
                <p className="text-gray-600 flex justify-center">
                  Please complete your Bio, Education, and Skills sections, update profile before downloading your CV.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateProfile;


export const boiPrompt = (text?:string)=>{
  if(!text){
    return "write a 150 words bio for me you can choose any profession of chioce, let your response be only what I can use directly without edits"
  }

  return `Please help me refine this for my bio: ${text}, let your response be only what I can use directly, around 200 words`
}


export const careerPrompt = (text?:string)=>{
  if(!text){
    return "write a 200 words Career for me you can choose any profession of chioce, let your response be only what I can use directly without edits"
  }

  return `Please help me refine this for my  Interests / Career Goals: ${text},  let your response be only what I can use directly, around  200 words`
}
