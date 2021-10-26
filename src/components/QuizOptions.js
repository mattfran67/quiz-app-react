import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Button
} from '@mui/material'

const categories = [
  { value: 0, category: 'Any Category' },
  { value: 9, category: 'General Knowledge' },
  { value: 10, category: 'Entertainment: Books' },
  { value: 11, category: 'Entertainment: Film' },
  { value: 12, category: 'Entertainment: Music' },
  { value: 13, category: 'Entertainment: Musicals & Theatres' },
  { value: 14, category: 'Entertainment: Television' },
  { value: 15, category: 'Entertainment: Video Games' },
  { value: 16, category: 'Entertainment: Board Games' },
  { value: 17, category: 'Science & Nature' },
  { value: 18, category: 'Science: Computers' },
  { value: 19, category: 'Science: Mathematics' },
  { value: 20, category: 'Mythology' },
  { value: 21, category: 'Sports' },
  { value: 22, category: 'Geography' },
  { value: 23, category: 'History' },
  { value: 24, category: 'Politics' },
  { value: 25, category: 'Art' },
  { value: 26, category: 'Celebrities' },
  { value: 27, category: 'Animals' },
  { value: 28, category: 'Vehicles' },
  { value: 29, category: 'Entertainment: Comics' },
  { value: 30, category: 'Science: Gadgets' },
  { value: 31, category: 'Entertainment: Japanese Anime & Manga' },
  { value: 32, category: 'Entertainment: Cartoon & Animations' },
]

export const QuizOptions = ({ selectInput, handleChange }) => {
  return (
    <Card sx={{ height: '100%', maxWidth: 800, m: 'auto' }}>
      <CardContent
        sx={{ 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5" component="h2">
          Quiz Options
        </Typography>
        <FormControl fullWidth margin="dense">
          <InputLabel id="amount">Amount</InputLabel>
          <Select 
            labelId="amount"
            label="Amount"
            value={selectInput.amount}
            name="amount"
            onChange={handleChange}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" sx={{ marginBottom: 8 }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            name="category" 
            label="Category"
            value={selectInput.category}
            onChange={handleChange}
          >
            {categories.map(({ value, category }) => (
              <MenuItem value={value} key={value}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          marginTop="auto"
          textAlign="right"
        >
          <Button
            component={RouterLink}
            to={{ pathname: "/quiz", state: selectInput }}
            variant="contained"
          >
            Next
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
