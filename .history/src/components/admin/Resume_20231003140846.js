import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { EmployeeDetails } from "../../api/api";
import moment from "moment";
import { useParams } from "react-router-dom";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    fontSize: "10px",
    lineHeight: 1.5,
  },
  section_right: {
    padding: "0 0 10px 10px",
    width: "70%",
    flexGrow: 1,
    color: "#333",
  },
  section_left: {
    width: "40%",
    padding: 10,
    backgroundColor: "#253846",
    color: "#fff",
  },
  pagesetup: {
    width: "100%",
    height: "100vh",
  },
  profile: {
    maxWidth: "60%",
    margin: "15px auto",
    border: "5px",
    borderColor: "#fff",
  },
  contact: {
    padding: "15px 5px",
    marginTop: "15px",
    // borderTop: "1px solid #fff",
    textAlign: "left",
  },
  divBox: {
    padding: "15px 0",
    // marginTop: "15px",
    // borderTop: "1px solid #fff",
    textAlign: "left",
  },
  contactRow: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    lineHeight: 2,
    textTransform: "capitalize",
  },
  icon: {
    fontWeight: "600",
    color: "#ccc",
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottom: "1px solid #ccc",
    width: "auto",
    paddingBottom: 0,
  },
  subHeadingRight: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottom: "1px solid #ccc",
    width: "auto",
    paddingBottom: "5px",
  },
  skillDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "5px",
  },
  Skill: {
    backgroundColor: "#fff",
    color: "#333",
    padding: "3px 5px",
    textTransform: "uppercase",
    borderRadius: "3px",
    margin: 0,
    lineHeight: 1,
  },
  userName: {
    padding: "30px 15px",
    backgroundColor: "#fafafa",
    name: {
      fontSize: 24,
      textTransform: "uppercase",
    },
  },
  eduInner: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 10px",
    marginBottom: 5,
    backgroundColor: "#fafafa",
    alignItems: "center",
    textTransform: "capitalize",
  },
  eduLeft: {
    width: "70%",
  },
  eduRight: {
    width: "30%",
    textAlign: "right",
  },
  quaUni: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  qualification: {
    fontSize: 14,
    textTransform: "capitalize",
    marginRight: 5,
  },
});

// Create Document Component
function ResumeGrerator(props) {
  const { id } = useParams();
  const [User, setUser] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [Education, setEducation] = useState([]);
  const [userCareer, setuserCareer] = useState([]);
  const UserData = async () => {
    try {
      const userData = await EmployeeDetails(id);
      if (userData.data.length === 0) {
        setUser([]);
        setSkills([]);
        setuserCareer([]);
        setEducation([]);
      } else {
        setUser(userData.data.employee[0]);
        setSkills(userData.data.skill);
        setuserCareer(userData.data.career);
        setEducation(userData.data.education);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    UserData();
  }, [props]);

  /*Function to calculate the time duration of two dates */
  const calculateDuration = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    return `${
      years === 1 ? years + "year ," : years > 1 ? years + "years ," : ""
    } ${
      months === 1 ? months + "month ," : months > 1 ? months + "months ," : ""
    } ${days === 1 ? days + "day" : days !== 1 ? days + "days" : ""}`;
  };
  return (
    <PDFViewer style={styles.pagesetup}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section_left}>
            <View style={styles.profile}>
              <Image
                src={
                  User.profile_photo?.length > 0
                    ? User.profile_photo
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOWS60zE0_pk40_4fF40IWkb7nyLRRml0mzMgeY2GcSNXT32ZMhqyLhWEkWpXfggrLcI&usqp=CAU"
                }
              />
            </View>
            <View style={styles.contact}>
              <Text style={styles.subHeading}>Personal</Text>
              <View style={styles.contactRow}>
                {User.contact_no ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Phone:</Text>
                    <Text style={styles.conValue}>{User.contact_no}</Text>{" "}
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.email ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Email:</Text>
                    <Text style={styles.conValue}>{User.email}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.date_of_birth ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>DOB:</Text>
                    <Text style={styles.conValue}>{User.date_of_birth}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.gender ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Gender:</Text>
                    <Text style={styles.conValue}>{User.gender}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.marital_status ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Marital Status:</Text>
                    <Text style={styles.conValue}>{User.marital_status}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.nationality ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Nationality:</Text>
                    <Text style={styles.conValue}>{User.nationality}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.current_location ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Current Location:</Text>
                    <Text style={styles.conValue}>{User.current_location}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.language ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Language:</Text>
                    <Text style={styles.conValue}>{User.language}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.religion ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Religion:</Text>
                    <Text style={styles.conValue}>{User.religion}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.experience ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Expert:</Text>
                    <Text style={styles.conValue}>{User.experience} Year</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.work_permit_canada ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Canada Work Permit:</Text>
                    <Text style={styles.conValue}>
                      {User.work_permit_canada}
                    </Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.contactRow}>
                {User.work_permit_other_country ? (
                  <>
                    {" "}
                    <Text style={styles.icon}>Other Country Work Permit:</Text>
                    <Text style={styles.conValue}>
                      {User.work_permit_other_country}
                    </Text>
                  </>
                ) : (
                  ""
                )}
              </View>
            </View>
            {Skills.length === 0 ? null : (
              <View style={styles.contact}>
                <Text style={styles.subHeading}>SKILLS</Text>
                <View style={styles.skillDiv}>
                  {(Skills || []).map((skill) => (
                    <Text key={skill.skill_id} style={styles.Skill}>
                      {skill.skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
          <View style={styles.section_right}>
            <View style={styles.userName}>
              <Text style={styles.userName.name}>{User.name}</Text>
            </View>
            <View style={styles.divBox}>
              <Text style={styles.subHeadingRight}>About</Text>
              <View style={styles.AboutDiv}>
                <Text style={styles.aboutText}>{User.description}</Text>
              </View>
            </View>
            {Education.length === 0 ? null : (
              <View style={styles.divBox}>
                <Text style={styles.subHeadingRight}>Education</Text>
                <View style={styles.eduDiv}>
                  {(Education || []).map((edu) => (
                    <View key={edu.education_id} style={styles.eduInner}>
                      <View style={styles.eduLeft}>
                        <View style={styles.quaUni}>
                          <Text style={styles.qualification}>
                            {edu.qualification}
                          </Text>
                          <Text style={styles.university}>
                            ({edu.university_institute})
                          </Text>
                        </View>
                        <View style={styles.couSpec}>
                          <Text style={styles.course}>
                            {edu.course} - {edu.specialization}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.eduRight}>
                        <Text style={styles.year}>{edu.passing_year}</Text>
                        <Text style={styles.location}>
                          {edu.institute_location}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {userCareer.length === 0 ? null : (
              <View style={styles.divBox}>
                <Text style={styles.subHeadingRight}>Experience</Text>
                <View style={styles.expDiv}>
                  {(userCareer || []).map((edu) => (
                    <View key={edu.career_id} style={styles.eduInner}>
                      <View style={styles.eduLeft}>
                        <View style={styles.quaUni}>
                          <Text style={styles.qualification}>
                            {edu.designation}
                          </Text>
                          <Text style={styles.university}>
                            ({edu.functional_area})
                          </Text>
                        </View>
                        <View style={styles.couSpec}>
                          <Text style={styles.course}>
                            {edu.company} - ({edu.industry})
                          </Text>
                        </View>
                      </View>
                      <View style={styles.eduRight}>
                        {/* {
                        let a = moment([2015, 11, 29]);
                        let b = moment([2007, 06, 27]);
                        
                        let years = ((moment([2015, 11, 29])).diff(moment([2015, 11, 29]), 'year').add(years, 'years'));
                        
                        let months = a.diff(b, 'months');
                        b.add(months, 'months');
                      } */}
                        <Text style={styles.year}>
                          {/* {edu.currently_work_here != null
                            ? moment(edu.end_date).diff(
                                moment(edu.start_date),
                                "year"
                              ) !== 0
                              ? moment(edu.end_date).diff(
                                  moment(edu.start_date),
                                  "year"
                                ) + "Y, "
                              : null +
                                  moment(edu.end_date).diff(
                                    moment(edu.start_date),
                                    "month"
                                  ) !==
                                0
                              ? moment(edu.end_date).diff(
                                  moment(edu.start_date),
                                  "month"
                                ) + "M"
                              : null
                            : edu.start_date + "- Now"} */}
                          {/* {edu.start_date}-
                        {edu.end_date || edu.currently_work_here} */}
                          {calculateDuration(edu.start_date, edu.end_date)}
                        </Text>
                        <Text style={styles.location}>
                          {edu.company_location}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default ResumeGrerator;
