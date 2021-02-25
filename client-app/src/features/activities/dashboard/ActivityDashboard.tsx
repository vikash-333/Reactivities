import React, { Fragment } from 'react';
import { Container, Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity:(id: string) => void;
    cancelSelectActivity:() => void;
}

export default function ActivityDashboard({activities,selectedActivity,selectActivity,cancelSelectActivity}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>       
                <List>
                    <ActivityList activities={activities} selectActivity={selectActivity}/>
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                <ActivityDetail activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}/>}
                <ActivityForm/>
            </Grid.Column>
        </Grid>
        
    )
    
}