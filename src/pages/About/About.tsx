import { Card, CardMedia, CardContent, Typography, CardActions, Button, Divider, Link } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment } from 'react'

export const About = (): JSX.Element => {
  const aboutData = [
    {
      id: 0,
      teamMember: 'Julia',
      photo: './julia.jpg',
      role: 'Commercetools/Front-end',
      bio: 'Julia is a junior frontend developer with experience in JavaScript and TypeScript, currently making her first steps in React. She has worked with commercetools, a popular technology stack for frontend development. Before becoming a frontend developer, Julia was a translator, working mostly with French, English, and Italian languages. However, she believes that AI will soon take her place in translation, which is why she decided to learn a programming language next. Julia is a hardworking and reliable person, always ready to take on new challenges and learn new skills.',
      github: 'https://github.com/JuliaBel5',
    },
    {
      id: 1,
      teamMember: 'Denis',
      photo: './denis.jpeg',
      role: 'Front-end',
      bio: "Dan is a highly skilled and talented junior JavaScript developer who has made remarkable progress during his studies. He plays a crucial role in our team as the main code writer for our application. Despite being relatively new to the field, Dan has quickly mastered React and Material UI (MUI), demonstrating his ability to adapt and learn new technologies efficiently. He also has a good understanding of our backend, Julia, which allows for smoother collaboration between the front-end and back-end parts of our team. One of Dan's most valuable qualities is his sense of responsibility. He consistently demonstrates a strong work ethic and a willingness to put maximum effort into our collective goals. When the team needs to come together and tackle challenges, Dan is always ready to lend a hand and share his expertise. His dedication and commitment make him an asset to our team. Although Dan is currently part of our team, he is open to exploring new job opportunities. This demonstrates his ambition to develop his skills and seek new challenges in his career. Dan's combination of technical skills, eagerness to learn, and collaborative mindset make him an excellent candidate for any team looking to add a talented and motivated junior JavaScript developer to their ranks.",
      github: 'https://github.com/Laevus92',
    },
    {
      id: 2,
      teamMember: 'Alexey',
      photo: './alexey.jpeg',
      role: 'TeamLead/Front-end',
      bio: 'Alexey is an experienced developer with a strong passion for writing code. Before joining RS School, he worked in a related department, but always aspired to be a developer. In the project, Alexey has taken on several important roles, including creating routing, pagination and code refactoring. He was even nicknamed "Refactor Man" for his expertise in refactoring code. Alexey\'s leadership and social skills made him the unanimous choice for the team leader role. He managed the ticket flow in Trello and initiated team calls. He also kept the team happy by allowing them to take breaks when needed. These soft skills, along with his technical expertise, contributed to his success as a team leader. In addition, his idea of using React and MUI for application development proved to be beneficial. Overall, he is a valuable member of the team, contributing both technically and as a teamlead',
      github: 'https://github.com/turn2river',
    },
  ]

  return (
    <Fragment>
      <Typography variant="h2" component="h2" sx={{ marginTop: '20px', fontWeight: 400 }}>
        CoffeeCode
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={'20px'}>
        Introducing our team, Coffee Code, who has been working diligently on our final project for the RS School
        course. Our project is an e-commerce app that aims to provide a seamless and enjoyable shopping experience for
        our users.
      </Typography>
      <Divider sx={{ marginTop: '20px' }} />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', flexWrap: 'wrap' }}>
          {aboutData.map((profile) => {
            const { id, teamMember, photo, role, bio, github } = profile
            return (
              <Card
                key={id}
                sx={{
                  maxWidth: 400,
                  padding: '0 10px',
                }}>
                <CardMedia component="img" alt="coffeecoder" height="400" image={photo} />
                <CardContent>
                  <Typography variant="h3" component="div">
                    {teamMember}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                    {role}
                  </Typography>
                  <CardActions sx={{ p: 0 }}>
                    <Button href={github} target="blank" size="small">
                      Github
                    </Button>
                  </CardActions>
                  <Divider />
                  <Typography variant="body2" color="text.secondary" mt={'20px'} minHeight={320}>
                    {bio}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      </Box>
      <Divider sx={{ marginTop: '40px' }} />
      <Link href="https://rs.school/js/" target="blank">
        <Box component="img" alt="rsslogo" height="100px" src="rss.svg" mt="20px" />
      </Link>
    </Fragment>
  )
}
