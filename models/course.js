const {v4: uuid} = require('uuid');
const path = require('path');
const fs = require('fs');
const { errorMonitor } = require('events');

class Course {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.id = uuid();
    }

    toCourseObject() {
        return {
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.id
        }
    }

    static async update(course) {
        const courses = await Course.getAll();
        const idx = courses.findIndex(c => c.id === course.id);

        courses[idx] = course;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.toCourseObject());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static async getById(id) {
        const courses = await Course.getAll();
        return courses.find(course => course.id === id);
    // }
        // return new Promise((resolve, reject) => {
        //     fs.readFile(
        //         path.join(__dirname, '..', 'data', 'courses.json'),
        //         'utf-8',
        //         (error, content) => {
        //             if (error) {
        //                 reject(error) 
        //             }
        //             else {
        //                 resolve(JSON.parse(content));
        //             }
        //         }
        //     )
        // });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (error, content) => {
                    if (error) {
                        reject(error) 
                    }
                    else {
                        resolve(JSON.parse(content));
                    }
                }
            )
        });
    }
}

module.exports = Course;