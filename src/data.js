const data = [
    {
        id: 1,
        age: 20,
        name: 'Bayui Erlangga ',
        gender: 'Laki-laki',
        class: 'Programmer',
        
    },
    
];

function addStudent(student) {
    data.map(()=> {
        const newData = [
            ...data,
            { ...student }
        ]

        return newData;
    });

}

export { addStudent, data };