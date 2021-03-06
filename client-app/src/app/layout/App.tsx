import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  
  const [activities, setactivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setactivities(response.data);
    })
  },[])

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x=>x.id===id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose()
  {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity)
  {
    activity.id
    ? setactivities([...activities.filter(x => x.id !== activity.id),activity])
    : setactivities([...activities, {...activity, id:uuid()}]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setactivities([...activities.filter(x => x.id !== id)]);
  }
  return (
    <div>
      <NavBar handleFormOpen={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard activities = {activities} 
          selectedActivity = {selectedActivity} 
          selectActivity = {handleSelectActivity} 
          cancelSelectActivity = {handleCancelSelectActivity}
          handleFormOpen = {handleFormOpen}
          handleFromClose = {handleFormClose}
          editMode = {editMode} 
          handleEditForm = {handleCreateOrEditActivity}
          handleDeleteActivity = {handleDeleteActivity}
          />
      </Container>
       
        
    </div>
  );
}

export default App;