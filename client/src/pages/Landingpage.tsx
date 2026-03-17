import { useAuth } from "../Contexts/AuthContext"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-bold">StudyMedic</h1>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="hover:text-gray-600">Courses</a>
          <a href="#" className="hover:text-gray-600">Pricing</a>
          <a href="#" className="hover:text-gray-600">About</a>
        </nav>
        <Link to="/" className="bg-black text-white px-4 py-2 rounded-lg">
          Login
        </Link>
      </header>

      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-6 py-20 max-w-6xl mx-auto">
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Learn skills that actually matter
          </h2>
          <p className="mt-6 text-gray-600">
            Join thousands of learners mastering real-world skills with expert-led courses.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl">
              Start Learning
            </button>
            <button className="border px-6 py-3 rounded-xl">
              Browse Courses
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">🔥 Popular Course</h3>
          <p className="text-lg font-bold">Full Stack Web Development</p>
          <p className="text-sm text-gray-500 mt-2">
            12 weeks • Projects • Certification
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Expert Mentors",
              desc: "Learn from industry professionals"
            },
            {
              title: "Hands-on Projects",
              desc: "Build real-world applications"
            },
            {
              title: "Certifications",
              desc: "Boost your career with credentials"
            }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center">
          Popular Courses
        </h3>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {["React Mastery", "Data Science", "UI/UX Design"].map((course, i) => (
            <div key={i} className="border rounded-2xl p-6 hover:shadow-lg transition">
              <h4 className="text-lg font-semibold">{course}</h4>
              <p className="text-gray-500 mt-2">
                Beginner to advanced level
              </p>
              <button className="mt-4 text-sm font-medium underline">
                View Course →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20 px-6">
        <h3 className="text-3xl font-bold text-center">
          Pricing Plans
        </h3>

        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          
          {/* Free */}
          <div className="border rounded-2xl p-6">
            <h4 className="text-xl font-semibold">Free</h4>
            <p className="text-3xl font-bold mt-4">₹0</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>✔ Limited courses</li>
              <li>✔ Community access</li>
            </ul>
            <button className="mt-6 w-full border py-2 rounded-lg">
              Get Started
            </button>
          </div>

          {/* Pro */}
          <div className="border-2 border-black rounded-2xl p-6">
            <h4 className="text-xl font-semibold">Pro</h4>
            <p className="text-3xl font-bold mt-4">₹499/mo</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>✔ All courses</li>
              <li>✔ Certificates</li>
              <li>✔ Priority support</li>
            </ul>
            <button className="mt-6 w-full bg-black text-white py-2 rounded-lg">
              Upgrade
            </button>
          </div>

          {/* Enterprise */}
          <div className="border rounded-2xl p-6">
            <h4 className="text-xl font-semibold">Enterprise</h4>
            <p className="text-3xl font-bold mt-4">Custom</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>✔ Team access</li>
              <li>✔ Analytics</li>
              <li>✔ Dedicated support</li>
            </ul>
            <button className="mt-6 w-full border py-2 rounded-lg">
              Contact Us
            </button>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h3 className="text-4xl font-bold">
          Start learning today 🚀
        </h3>
        <p className="text-gray-600 mt-4">
          Upgrade your skills and grow your career.
        </p>
        <button className="mt-6 bg-black text-white px-8 py-3 rounded-xl">
          Join Now
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t">
        © 2026 StudyMedic. All rights reserved.
      </footer>
    </div>
  )
}