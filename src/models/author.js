module.exports = (connection, DataTypes) => {
    const schema = {
        author: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                args: [true],
                msg: 'an author is required',
            },
            notEmpty: {
                args: [true],
                msg: 'author must not be empty',
            },
        },
    };

    const AuthorModel = connection.define('Author', schema);
    return AuthorModel;
};