'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    return db.createTable('rooms', {
    id:
    {
	type: 'int',
	autoIncrement: true,
	primaryKey: true	
    },
    owner_id:
    {
	type: 'int',
	unsigned: true,
	notNull: true,
	foreignKey: {
	    name: 'room_owner_id_fk',
	    table: 'users',
	    rules: {
		  onDelete: 'CASCADE',
		  onUpdate: 'RESTRICT'
		},
	    mapping: {
		  owner_id: 'id'
		}
	}
    },
    capacity:
    {
	type: 'int',
	defaultValue: 2
    },
    room_type:
    {
	type: 'string',
	notNull: true
    },
    open:
    {
	type: 'boolean',
	defaultValue: false
    }
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
