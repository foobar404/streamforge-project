
exports.up = function(knex) {
    return knex.schema.createTable('usernames', tbl => {
        tbl.increments();
        tbl.string('username')
            .notNullable()
            .unique();
        tbl.integer('followers')
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usernames');
};
