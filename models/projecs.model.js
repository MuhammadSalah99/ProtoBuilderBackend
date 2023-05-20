module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        clientName: {
            type: Sequelize.STRING
        }
    });

    return Project

};
