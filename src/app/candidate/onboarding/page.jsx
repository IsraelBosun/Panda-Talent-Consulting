'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { db } from '../../../../config/firebase-client';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // -------------------------
  // Form State
  // -------------------------
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    bio: '',
    location: '',
    salaryExpectation: '',
    skills: [{ name: '', level: 'Intermediate' }],
    projects: [{ title: '', description: '', techStack: '', link: '' }],
  });

  // -------------------------
  // Guards
  // -------------------------
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading user...
      </div>
    );
  }

  // -------------------------
  // Handlers
  // -------------------------
  const handleUpdateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 'Intermediate' }],
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', techStack: '', link: '' }],
    }));
  };

  // -------------------------
  // Submit Profile
  // -------------------------
  const submitProfile = async () => {
    setLoading(true);

    try {
      const candidateRef = doc(db, 'candidates', currentUser.uid);

      await setDoc(
        candidateRef,
        {
          uid: currentUser.uid,
          email: currentUser.email,
          role: 'candidate',
          ...formData,
          onboarding_complete: true,
          status: 'active',
          updatedAt: serverTimestamp(),
        },
        { merge: true } // ✅ create OR update safely
      );

      toast.success('Profile completed!');
      router.push('/candidate/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>

            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Full Name"
              onChange={(e) => handleUpdateField('fullName', e.target.value)}
            />

            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Professional Title (e.g. AI Engineer)"
              onChange={(e) => handleUpdateField('title', e.target.value)}
            />

            <textarea
              className="w-full p-3 border rounded-lg h-32"
              placeholder="Tell us about your professional journey..."
              onChange={(e) => handleUpdateField('bio', e.target.value)}
            />

            <button
              onClick={() => setStep(2)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg"
            >
              Next: Skills
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Skills & Expertise</h2>

            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-4">
                <input
                  className="flex-1 p-3 border rounded-lg"
                  placeholder="Skill (e.g. React)"
                  value={skill.name}
                  onChange={(e) => {
                    const skills = [...formData.skills];
                    skills[index].name = e.target.value;
                    setFormData({ ...formData, skills });
                  }}
                />

                <select
                  className="p-3 border rounded-lg"
                  value={skill.level}
                  onChange={(e) => {
                    const skills = [...formData.skills];
                    skills[index].level = e.target.value;
                    setFormData({ ...formData, skills });
                  }}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>
            ))}

            <button onClick={addSkill} className="text-indigo-600 font-medium">
              + Add Another Skill
            </button>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 py-3 rounded-lg">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg"
              >
                Next: Projects
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Top Projects</h2>

            {formData.projects.map((proj, index) => (
              <div key={index} className="p-4 border rounded-xl bg-gray-50 space-y-3">
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Project Title"
                  onChange={(e) => {
                    const projects = [...formData.projects];
                    projects[index].title = e.target.value;
                    setFormData({ ...formData, projects });
                  }}
                />

                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Project description..."
                  onChange={(e) => {
                    const projects = [...formData.projects];
                    projects[index].description = e.target.value;
                    setFormData({ ...formData, projects });
                  }}
                />
              </div>
            ))}

            <button onClick={addProject} className="text-indigo-600 font-medium">
              + Add Project
            </button>

            <button
              onClick={submitProfile}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? 'Finalizing Profile...' : 'Complete Onboarding'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
