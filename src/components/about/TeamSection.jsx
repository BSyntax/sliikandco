import React from "react";
import Alex from "../../assets/images/team-alex.webp";
import Jamie from "../../assets/images/team-jamie.webp";
import Sam from "../../assets/images/team-sam.webp";
import Taylor from "../../assets/images/team-taylor.webp";

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & Creative Director",
    img: Alex,
  },
  {
    name: "Jamie Lee",
    role: "Head of Design",
    img: Jamie,
  },
  {
    name: "Sam Rivera",
    role: "Lead Stylist",
    img: Sam,
  },
  {
    name: "Taylor Quinn",
    role: "Marketing Director",
    img: Taylor,
  },
];

export default function TeamSection() {
  return (
    <section className="team-section">
      <div className="team-container container">
        <div className="team-header">
          <h3 className="team-title">Meet the Team</h3>
          <p className="team-subtitle">
            Meet the hands and hearts behind every piece you love.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="img-wrapper">
                <img src={member.img} alt={member.name} className="team-img" />
              </div>
              <h4 className="team-name">{member.name}</h4>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
