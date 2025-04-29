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

const CreateProfile = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile submitted", skills);
    navigate("/opportunities");
  };

  useEffect(() => {
    const saved = localStorage.getItem("draftSkills");
    if (saved) setSkills(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("draftSkills", JSON.stringify(skills));
  }, [skills]);

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
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <Input id="experience" placeholder="e.g., Beginner" />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn / Portfolio</Label>
                      <Input
                        id="linkedin"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your background, interests, or goals"
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
                  <Input placeholder="e.g., Remote work, NGO work, Entrepreneurship" />
                  <Label htmlFor="preferredIndustries">
                    Preferred Industries (optional)
                  </Label>
                  <Input
                    id="preferredIndustries"
                    placeholder="e.g., tech, healthcare"
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
                      />
                    </div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="accent-purple-600" />
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
                    <select className="w-full rounded-md border border-gray-300 p-2">
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
                    {["Jobs", "Scholarships", "Grants", "Mentorship"].map(
                      (type) => (
                        <label key={type} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="accent-purple-600"
                          />
                          <span>{type}</span>
                        </label>
                      )
                    )}
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
                  />
                  <Label>Access to Devices</Label>
                  <div className="space-y-1">
                    {[
                      "I own a smartphone",
                      "I have regular internet access",
                      "I can access a laptop or desktop computer",
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input type="checkbox" className="accent-purple-600" />
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
                    className="bg-equibridge-purple hover:bg-purple-600"
                  >
                    Create Profile
                  </Button>
                </div>
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
