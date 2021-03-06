import React from 'react';
import { Button, Item, ItemContent, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';
import ActivityDetail from '../details/ActivityDetail';

interface Props{
    activities:Activity[];
    selectActivity:(id:string)=>void;
    handleDeleteActivity:(id: string)=>void
}
export default function ActivityList({activities, selectActivity, handleDeleteActivity}:Props){
    return(
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <ItemContent>
                            <Item.Header as ='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>
                                    {activity.city}, {activity.venue}
                                </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={()=>selectActivity(activity.id)}/>
                                <Button floated='right' content='Delete' color='red' onClick={()=>handleDeleteActivity(activity.id)}/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </ItemContent>    
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}