type Message = {
    text: string;
    sender: 'localUser' | 'remoteUser';
    timeCreated: Date;
};
