import {ListGroup} from 'react-bootstrap';
import {useUserList} from "../states/useUserList";
import {useMessages} from "../states/useMessages.ts";

const UserList = () => {
    const {username} = useUserList();
    const {userList} = useUserList();
    const {selectUser, activeUser} = useMessages();
    return (
        <ListGroup className="w-100">
            {userList.map((name) => (
                <ListGroup.Item key={name} onClick={(username === name) ? () => {} : () => selectUser(name)} active={name === activeUser}>
                    {`${name}${(username === name) ? ' (you)' : ''}`}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default UserList;
