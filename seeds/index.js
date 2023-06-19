const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');
// I was having trouble seeding data after debugging. I kept getting an error message
// saying there was a foreign key constraint preventing dropping the tag table
// referancing the product_tag table. So i did this so that it wouldnt mess up the seeding data. 
const dropAndRecreateTables = async () => {
  try {
    // disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    // drop and then recreate the tables
    await sequelize.sync({ force: true });
    // enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Tables dropped and recreated successfully!');
  } catch (error) {
    console.error('Error occurred while dropping and recreating tables:', error);
  }
};
// seed data to db
const seedAll = async () => {
  await dropAndRecreateTables();
  console.log('\n----- TABLES DROPPED AND RECREATED -----\n');

  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
