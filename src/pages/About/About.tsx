import { Card, CardMedia, CardContent, Typography, CardActions, Button, Divider, Link } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment } from 'react'

export const About = (): JSX.Element => {
  const aboutData = [
    {
      teamMember: 'Julia',
      photo: './avatar.jpg',
      role: 'Commercetools/Front-end',
      bio: 'Julia is a junior frontend developer with experience in JavaScript and TypeScript, currently making her first steps in React. She has worked with commercetools, a popular technology stack for frontend development. Before becoming a frontend developer, Julia was a translator, working mostly with French, English, and Italian languages. However, she believes that AI will soon take her place in translation, which is why she decided to learn a programming language next. Julia is a hardworking and reliable person, always ready to take on new challenges and learn new skills.',
      github: 'https://github.com/JuliaBel5',
    },
    {
      teamMember: 'Denis',
      photo: './denis.jpeg',
      role: 'Front-end',
      bio: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est voluptates molestiae cupiditate hic voluptatem nam quia temporibus. Nihil quam facere illum eligendi amet voluptatem repudiandae odio illo, corporis ea suscipit tenetur eos totam, ipsam optio qui in maiores, vitae eum. Unde rerum vero laboriosam at voluptate nam libero voluptates sed!',
      github: 'https://github.com/Laevus92',
    },
    {
      teamMember: 'Alexey',
      photo: './alexey.jpeg',
      role: 'TeamLead/Front-end',
      bio: 'Frontend developer heavily influenced by isual arts, interactions and UX. Gravitating around design and code. Addicted to games, movies and good coffee. Alexey is a team lead of CoffeeCode team, mainly responsible for UI and team management',
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        {aboutData.map((profile) => {
          const { teamMember, photo, role, bio, github } = profile
          return (
            <Card sx={{ maxWidth: 400, padding: '0 10px' }}>
              <CardMedia component="img" alt="coffeecoder" height="400" image={photo} />
              <CardContent>
                <Typography variant="h3" component="div">
                  {teamMember}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  {role}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={'20px'} minHeight={320}>
                  {bio}
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={github} target="blank" size="small">
                  Github
                </Button>
              </CardActions>
            </Card>
          )
        })}
      </Box>
      <Divider sx={{ marginTop: '40px' }} />
      <Link href="https://rs.school/js/" target="blank">
        <Box component="img" alt="rsslogo" height="100px" src="rss.svg" mt="20px" />
      </Link>
    </Fragment>
  )
}
