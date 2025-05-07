import React, { useEffect, useState } from "react";
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
import { useAuth } from "../../api/hooks/useAuth";
import { useUpdateProfile } from "../../api/hooks/useUpdateProfile";
import { useAdzunaJobsMutation } from "../../api/hooks/useAdzunaJobsMutation";

const CreateProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const { mutate, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
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
  const mutateAzuna =useAdzunaJobsMutation()

  const sampleJobAdzunaParams = {
    query: "frontend developer",
    location: "usa",
    results_per_page: 20,
    page: 1,
  };



  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile submitted", skills);

    const payload = {
      ...formData,
      skills,
    };

    mutate(payload, {
      onSuccess: () => {
        localStorage.removeItem("draftSkills");
        navigate("/opportunities");
      },
      onError: (err) => {
        console.error("Profile update failed:", err);
      },
    });
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
                {/* Personal Information */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        required
                        value={user?.first_name}
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
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        required
                        value={user?.last_name}
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
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
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
                      <Label htmlFor="experience">Experience Level</Label>
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
                      <Label htmlFor="linkedin">LinkedIn / Portfolio</Label>
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
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your background, interests, or goals"
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                    />
                  </div>
                </section>

                {/* Skills */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <Label>Add skills (press Enter to add)</Label>
                  <Input
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="e.g., Cooking, Sales"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
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
                  <div className="flex flex-wrap gap-2 mt-2">
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
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Interests / Career Goals
                  </h3>
                  <Input
                    placeholder="e.g., Remote work, NGO work, Entrepreneurship"
                    value={formData.interests}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        interests: e.target.value,
                      }))
                    }
                  />
                  <Label htmlFor="preferredIndustries">
                    Preferred Industries (optional)
                  </Label>
                  <Input
                    id="preferredIndustries"
                    placeholder="e.g., tech, healthcare"
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
                      <Label htmlFor="education">Level of Education</Label>
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
                      <Label htmlFor="employment">
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
                    <div>
                      <Label htmlFor="income">
                        Household Income Range (optional)
                      </Label>
                      <Input
                        id="income"
                        placeholder="e.g., Low, Medium, High"
                        className=""
                        value={formData.income}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            income: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <label className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        className="accent-purple-600"
                        checked={formData.is_single_parent}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            is_single_parent: e.target.checked,
                          }))
                        }
                      />
                      <span>
                        I have single parent / caregiver responsibilities
                      </span>
                    </label>
                  </div>
                </section>

                {/* Accessibility Needs */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Accessibility & Disability
                  </h3>
                  <div>
                    <Label>Do you identify as having a disability?</Label>
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
                    <Label htmlFor="accessibilityRequirements">
                      Accessibility Requirements (optional)
                    </Label>
                    <Textarea
                      id="accessibilityRequirements"
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

                {/* Opportunity Preferences */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Opportunity Preferences
                  </h3>
                  <Label>Types of Opportunities You're Looking For</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Jobs", "Mentorship"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="checkbox" className="accent-purple-600" />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                  <Label>Preferred Work Format</Label>
                  <div className="flex gap-4">
                    {["Remote", "On-site", "Hybrid"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="checkbox" className="accent-purple-600" />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Languages & Devices */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Languages & Devices</h3>
                  <Label htmlFor="languages">Languages Spoken</Label>
                  <Input
                    id="languages"
                    placeholder="e.g., English, Yoruba, Hausa"
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
                          checked={formData.devices.includes(
                            "I own a smartphone"
                          )}
                          onChange={(e) => {
                            const value = "I own a smartphone";
                            setFormData((prev) => ({
                              ...prev,
                              devices: e.target.checked
                                ? [...prev.devices, value]
                                : prev.devices.filter((v) => v !== value),
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
                    type="submit"
                    className="bg-[var(--equipurple)]
                    hover:bg-purple-600 cursor-pointer"
                    onClick={handleSubmit}
                  >
                    {isPending ? "Creating profile..." : " Create Profile"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <Button onClick={async()=>{
         const response = await mutateAzuna.mutateAsync(sampleJobAdzunaParams)
         console.log(response);
        }}>call adzuna test</Button>
      </main>
      <Footer />
    </div>
  );
};

export default CreateProfile;
