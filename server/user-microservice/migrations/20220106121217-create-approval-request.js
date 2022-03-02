'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('approvalRequest', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            courseId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            employeeId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'employee'
                    },
                    key: 'id'
                },
            },
            approvedManagerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'employee'
                    },
                    key: 'id'
                },
            },
            requestTime: {
                allowNull: false,
                type: Sequelize.DATE
            },
            status: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            decisionTime: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('approvalRequest');
    }
};