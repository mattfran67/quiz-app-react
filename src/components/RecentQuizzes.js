import React from 'react'
import { formatDistance } from 'date-fns'
import { Link as RouterLink } from 'react-router-dom'
import { 
  Card,
  CardContent,
  Typography, 
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material'

export const RecentQuizzes = ({ quizResults }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h5" component="h2">
          Recent Quizzes
        </Typography>
        <List>
          {quizResults.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink} 
                  to={{ pathname: "/result", state: item.quizResult }}
                >
                  <ListItemText
                    primary={`Quiz ${index + 1}`}
                    secondary={formatDistance(
                      item.date,
                      Date.now(),
                      { addSuffix: true }
                    )}
                  />
                </ListItemButton>
              </ListItem>
              {index < quizResults.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
