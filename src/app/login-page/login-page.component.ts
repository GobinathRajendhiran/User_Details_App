import { Component, OnInit } from '@angular/core';
import { Validator, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  // userList = [
  //   {name : 'gobi@gmail.com', password : '12345678'},
  //   {name : 'ezhil@gmail.com', password : '12345678'},
  //   {name : 'kesav@gmail.com', password : '12345678'},
  //   {name : 'karthik@gmail.com', password : '12345678'},
  //   {name : 'ruhi@gmail.com', password : '12345678'},
  //   {name : 'thusha@gmail.com', password : '12345678'},
  // ]
  // this.userList.forEach(ele => {
  //   this.afAuth.createUserWithEmailAndPassword(ele.name, ele.password);
  // })

  // users = [
  //   {
  //     name: 'Gobi',
  //     location: 'Chennai, India',
  //     education: {
  //       degree: 'B.Tech in Computer Science',
  //       university: 'Anna University',
  //       yearOfGraduation: 2015,
  //     },
  //     hobbies: ['Reading', 'Gaming', 'Coding'],
  //     experience: '5 years as Full Stack Developer',
  //     about: 'Passionate about building scalable web applications and exploring new technologies.',
  //     summary: 'Gobi is a seasoned full stack developer with a passion for creating efficient and scalable web applications. With 5 years of experience in the industry, he is skilled in various technologies and enjoys gaming and reading in his spare time.',
  //     personalDetails: {
  //       age: 30,
  //       gender: 'Male',
  //       maritalStatus: 'Single',
  //       nationality: 'Indian',
  //     },
  //     contactDetails: {
  //       email: 'gobi@example.com',
  //       phone: '+91-9876543210',
  //       linkedIn: 'linkedin.com/in/gobi',
  //       github: 'github.com/gobi',
  //     },
  //     otherDetails: {
  //       languagesSpoken: ['English', 'Tamil'],
  //       preferredWorkingHours: '9 AM - 5 PM',
  //       certifications: ['AWS Certified Developer', 'Certified Scrum Master'],
  //     },
  //     workHistory: [
  //       {
  //         company: 'Tech Solutions',
  //         role: 'Full Stack Developer',
  //         duration: '2016-2019',
  //         responsibilities: ['Developed web applications', 'Collaborated with design team', 'Maintained codebase'],
  //       },
  //       {
  //         company: 'Innovatech',
  //         role: 'Senior Full Stack Developer',
  //         duration: '2019-Present',
  //         responsibilities: ['Lead development team', 'Architected new features', 'Improved application performance'],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Ezhil',
  //     location: 'Bangalore, India',
  //     education: {
  //       degree: 'M.Tech in Information Technology',
  //       university: 'IIT Bangalore',
  //       yearOfGraduation: 2018,
  //     },
  //     hobbies: ['Photography', 'Traveling', 'Blogging'],
  //     experience: '3 years as Backend Developer',
  //     about: 'Enthusiastic about cloud technologies and backend systems.',
  //     summary: 'Ezhil is an enthusiastic backend developer with a strong focus on cloud technologies. With 3 years of experience, she is passionate about photography and traveling, and enjoys exploring new places in her free time.',
  //     personalDetails: {
  //       age: 28,
  //       gender: 'Female',
  //       maritalStatus: 'Married',
  //       nationality: 'Indian',
  //     },
  //     contactDetails: {
  //       email: 'ezhil@example.com',
  //       phone: '+91-9876543221',
  //       linkedIn: 'linkedin.com/in/ezhil',
  //       github: 'github.com/ezhil',
  //     },
  //     otherDetails: {
  //       languagesSpoken: ['English', 'Kannada'],
  //       preferredWorkingHours: '10 AM - 6 PM',
  //       certifications: ['Google Cloud Professional', 'Certified Kubernetes Administrator'],
  //     },
  //     workHistory: [
  //       {
  //         company: 'CloudWorks',
  //         role: 'Backend Developer',
  //         duration: '2018-2020',
  //         responsibilities: ['Developed backend services', 'Integrated third-party APIs', 'Maintained server infrastructure'],
  //       },
  //       {
  //         company: 'TechSphere',
  //         role: 'Senior Backend Developer',
  //         duration: '2020-Present',
  //         responsibilities: ['Led backend development', 'Designed scalable systems', 'Optimized database performance'],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Kesav',
  //     location: 'Hyderabad, India',
  //     education: {
  //       degree: 'B.Sc in Mathematics',
  //       university: 'Osmania University',
  //       yearOfGraduation: 2014,
  //     },
  //     hobbies: ['Chess', 'Blogging', 'Data Analysis'],
  //     experience: '4 years as Data Scientist',
  //     about: 'Data enthusiast with a knack for problem-solving.',
  //     summary: 'Kesav is a dedicated data scientist with a strong background in mathematics and data analysis. With 4 years of experience, he enjoys solving complex problems and sharing his knowledge through blogging.',
  //     personalDetails: {
  //       age: 32,
  //       gender: 'Male',
  //       maritalStatus: 'Single',
  //       nationality: 'Indian',
  //     },
  //     contactDetails: {
  //       email: 'kesav@example.com',
  //       phone: '+91-9876543232',
  //       linkedIn: 'linkedin.com/in/kesav',
  //       github: 'github.com/kesav',
  //     },
  //     otherDetails: {
  //       languagesSpoken: ['English', 'Telugu'],
  //       preferredWorkingHours: '8 AM - 4 PM',
  //       certifications: ['Certified Data Scientist', 'Machine Learning Specialist'],
  //     },
  //     workHistory: [
  //       {
  //         company: 'DataPros',
  //         role: 'Junior Data Scientist',
  //         duration: '2016-2018',
  //         responsibilities: ['Analyzed datasets', 'Built predictive models', 'Collaborated with cross-functional teams'],
  //       },
  //       {
  //         company: 'Insight Analytics',
  //         role: 'Senior Data Scientist',
  //         duration: '2018-Present',
  //         responsibilities: ['Led data science projects', 'Developed machine learning algorithms', 'Provided data-driven insights'],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Karthik',
  //     location: 'Mumbai, India',
  //     education: {
  //       degree: 'MBA in Marketing',
  //       university: 'Mumbai University',
  //       yearOfGraduation: 2012,
  //     },
  //     hobbies: ['Cooking', 'Music', 'Public Speaking'],
  //     experience: '6 years as Marketing Manager',
  //     about: 'Creative marketer with a strategic mindset.',
  //     summary: 'Karthik is a creative marketing manager with a strategic approach to brand development and campaign execution. With 6 years of experience, he enjoys cooking and music, and is an avid public speaker.',
  //     personalDetails: {
  //       age: 35,
  //       gender: 'Male',
  //       maritalStatus: 'Married',
  //       nationality: 'Indian',
  //     },
  //     contactDetails: {
  //       email: 'karthik@example.com',
  //       phone: '+91-9876543243',
  //       linkedIn: 'linkedin.com/in/karthik',
  //     },
  //     otherDetails: {
  //       languagesSpoken: ['English', 'Hindi', 'Marathi'],
  //       preferredWorkingHours: '11 AM - 7 PM',
  //       certifications: ['Digital Marketing Specialist', 'Certified Brand Manager'],
  //     },
  //     workHistory: [
  //       {
  //         company: 'BrandBuilders',
  //         role: 'Marketing Executive',
  //         duration: '2012-2015',
  //         responsibilities: ['Developed marketing campaigns', 'Conducted market research', 'Managed social media'],
  //       },
  //       {
  //         company: 'MarketMasters',
  //         role: 'Marketing Manager',
  //         duration: '2015-Present',
  //         responsibilities: ['Led marketing team', 'Strategized brand campaigns', 'Analyzed market trends'],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Thusha',
  //     location: 'Pune, India',
  //     education: {
  //       degree: 'B.Com in Commerce',
  //       university: 'Savitribai Phule Pune University',
  //       yearOfGraduation: 2017,
  //     },
  //     hobbies: ['Dancing', 'Drawing', 'Yoga'],
  //     experience: '2 years as HR Executive',
  //     about: 'Dedicated HR professional focused on employee engagement.',
  //     summary: 'Thusha is a dedicated HR professional with a focus on employee engagement and organizational development. With 2 years of experience, she enjoys dancing, drawing, and practicing yoga in her free time.',
  //     personalDetails: {
  //       age: 27,
  //       gender: 'Female',
  //       maritalStatus: 'Single',
  //       nationality: 'Indian',
  //     },
  //     contactDetails: {
  //       email: 'thusha@example.com',
  //       phone: '+91-9876543254',
  //       linkedIn: 'linkedin.com/in/thusha',
  //     },
  //     otherDetails: {
  //       languagesSpoken: ['English', 'Marathi'],
  //       preferredWorkingHours: '9 AM - 6 PM',
  //       certifications: ['Certified HR Professional', 'Talent Management Specialist'],
  //     },
  //     workHistory: [
  //       {
  //         company: 'PeopleFirst',
  //         role: 'HR Assistant',
  //         duration: '2017-2018',
  //         responsibilities: ['Assisted in recruitment', 'Managed employee records', 'Coordinated training sessions'],
  //       },
  //       {
  //         company: 'EmployeeEngage',
  //         role: 'HR Executive',
  //         duration: '2018-Present',
  //         responsibilities: ['Led recruitment efforts', 'Implemented engagement programs', 'Handled employee relations'],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Ruhi',
  //     location: 'Pune, India',
  //     education: {
  //       degree: 'B.Com in Commerce',
  //       university: 'Savitribai Phule Pune University',
  //       yearOfGraduation: 2017,
  //     },
  //     hobbies: ['Dancing', 'Drawing', 'Yoga'],
  //     experience: '2 years as HR Executive',
  //     about: 'Dedicated HR professional focused on employee engagement.',
  //     summary: 'Thusha is a dedicated HR professional with a focus on employee engagement and organizational development. With 2 years of experience, she enjoys dancing, drawing, and practicing yoga in her free time.',
  //     personalDetails: {
  //       age: 27,
  //       gender: 'Female',
  //       maritalStatus: 'Single',
  //       nationality: 'Indian',
  //     },
  //     contactDetails: {
  //       email: 'ruhi@example.com',
  //       phone: '+91-9876543254',
  //       linkedIn: 'linkedin.com/in/thusha',
  //     },
  //     otherDetails: {
  //       languagesSpoken: ['English', 'Marathi'],
  //       preferredWorkingHours: '9 AM - 6 PM',
  //       certifications: ['Certified HR Professional', 'Talent Management Specialist'],
  //     },
  //     workHistory: [
  //       {
  //         company: 'PeopleFirst',
  //         role: 'HR Assistant',
  //         duration: '2017-2018',
  //         responsibilities: ['Assisted in recruitment', 'Managed employee records', 'Coordinated training sessions'],
  //       },
  //       {
  //         company: 'EmployeeEngage',
  //         role: 'HR Executive',
  //         duration: '2018-Present',
  //         responsibilities: ['Led recruitment efforts', 'Implemented engagement programs', 'Handled employee relations'],
  //       },
  //     ],
  //   }
  // ]

  constructor(private formBuilder: FormBuilder, private dataService: DataServiceService, private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) { 
    this.loginForm = this.formBuilder.group({
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {  }

  loginToAccount() {
    var userData = this.loginForm.value;
    
    this.afAuth.signInWithEmailAndPassword(userData.userId, userData.password).then(res => {
      localStorage.clear();
      // send user ID to get data from DB
      this.dataService.getSingleItemByUniqueId(userData.userId).subscribe(data => {
        localStorage.setItem('currentUserData', JSON.stringify(data));
        this.router.navigate(['homePage']);
      })
    }).catch(err => {
      alert("incorrect user id or password");
    })
  }
}