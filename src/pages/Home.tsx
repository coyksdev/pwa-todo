import { Box, Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [task, setTask] = React.useState('');
  const [tasks, setTasks] = React.useState<any[]>([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('todo').select();

    if (error) {
      console.log('error', error);
    } else {
      console.log('data', data);
      setTasks(data);
    }
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'RELOAD_PAGE') {
          window.location.reload();
        }
      });
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Box flexDirection={'row'} alignItems={'center'}>
        <TextField
          label="Task"
          value={task}
          onChange={(event) => {
            setTask(event.target.value);
          }}
        />
        <Button
          onClick={async () => {
            setTask('');
            setTasks((prev) => [...prev, { title: task }]);

            await supabase
              .from('todo')
              .insert([{ title: task }])
              .select();
          }}
        >
          Add Task
        </Button>
      </Box>
      {tasks?.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </>
  );
}
