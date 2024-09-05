const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const main = async () => {

    const category = [
        {
            name : 'urgent-important',
            acronym : 'UI'
        },
        {
            name : 'not urgent - important',
            acronym : 'nUI'
        },
        {
            name : 'urgent-not important',
            acronym : 'UnI'
        },
        {
            name : 'not urgent - not important',
            acronym : 'nUnI'
        },
    ]

    await prisma.category.createMany({
        data : category
    })

    const activityCategory = [
        {name : 'Sport'},
        {name : 'Work'},
        {name : 'Refreshing'},
        {name : 'Business'},
        {name : 'Upgrading Skill'},
    ]

    await prisma.activityCategory.createMany({
        data : activityCategory
    })

    const data = [
        {
            name : 'Andi',
            email : 'sufandi1@gmail.com',
            password : 'sufandi1',
            role : 'user',
            Todo : {
                createMany : {
                    data : [
                        {
                            name : 'Post Graduation in LinkedIn',
                            deadlineDate : new Date(),
                            plannedWorkDate : new Date(),
                            image : 'no-image.jpg',
                            isFinished : false,
                            categoryId : 2,
                            activityCategoryId : 2
                        },
                        {
                            name : 'Working on Mini Project',
                            deadlineDate : new Date(),
                            plannedWorkDate : new Date(),
                            image : 'no-image.jpg',
                            isFinished : false,
                            categoryId : 2,
                            activityCategoryId : 2
                        }
                    ]
                }
            }
        },
        {
            name : 'Budiono Siregar',
            email : 'budi12@gmail.com',
            password : 'budi12',
            role : 'user',
            Todo : {
                createMany : {
                    data : [
                        {
                            name : 'React Meme Kominfo',
                            deadlineDate : new Date(),
                            plannedWorkDate : new Date(),
                            image : 'no-image.jpg',
                            isFinished : false,
                            categoryId : 3,
                            activityCategoryId : 5
                        },
                        {
                            name : 'Recovery Data PDN',
                            deadlineDate : new Date(),
                            plannedWorkDate : new Date(),
                            image : 'no-image.jpg',
                            isFinished : false,
                            categoryId : 1,
                            activityCategoryId : 4
                        }
                    ]
                }
            }
        }
    ]

    data.map(async(obj) => {
        await prisma.user.create({
            data : obj
        })
    })

}

main();