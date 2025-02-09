import dotenv from "dotenv"
dotenv.config
import express from "express"
const router = express.Router()
import Test from "../module/test.js"
import Answers from "../module/answers.js"
import Question from "../module/question.js"
import verifyToken from "../middleware/auth.js"
import textContents from "../module/textContent.js"
import Groups from "../module/Groups.js"
import DoAssignment from "../module/doAssignment.js"

//get all testIds
router.get("/", verifyToken, async (req, res) => {
    try {
        const tests = await Test.find()
        let respone = []
        await Promise.all(
            tests.map(async (test) => {
                const name = await textContents.findById(test.name)
                respone.push({ id: test.id, name: name, groups: test.group, questions: test.questionCount })
            })
        )
        return res.status(200).json({ success: true, tests: respone })
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
})



//user get test information
router.get("/UserGetAsignmentOverview", verifyToken, async (req, res) => {
    try {
        const tests = await Test.find()
        let respone = []
        await Promise.all(
            tests.map(async (test) => {
                const name = await textContents.findById(test.name)
                const latestAssignment = await DoAssignment.find({ testId: test.id, userId: req.userId }).sort({ createdAt: -1 }).limit(1);
                let score = "-"
                if (latestAssignment.length)
                    score = 100*latestAssignment[0].score/test.questionCount
                respone.push({ id: test.id, name: name, groups: test.group, questions: test.questionCount, score: score })
            })
        )
        return res.status(200).json({ success: true, tests: respone })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error })
    }
})

//user get test
router.get("/user/:testId", verifyToken, async (req, res) => {
    const testId = req.params.testId;
    try {
        const test = await Test.findById(testId);
        if (!test)
            return res.status(404).json({ success: false, message: "Test not found with this ID:" + testId });
        
        const QuestionList = await Question.find({ testId: testId });
        const nameRes = await textContents.findById(test.name);
        let questions = [];

        await Promise.all(
            QuestionList.map(async (question) => {
                const trueAnswer = await Answers.findById(question.trueAnswer);
                const falseAsw1 = await Answers.findById(question.falseAnswer1);
                const falseAsw2 = await Answers.findById(question.falseAnswer2);
                const falseAsw3 = await Answers.findById(question.falseAnswer3);
                const content = await textContents.findById(question.question);
                
                let trueAnswerText = {};
                let falseAsw1Text = {};
                let falseAsw2Text = {};
                let falseAsw3Text = {};
                
                if (trueAnswer)
                    trueAnswerText = await textContents.findById(trueAnswer.content);
                if (falseAsw1)
                    falseAsw1Text = await textContents.findById(falseAsw1.content);
                if (falseAsw2)
                    falseAsw2Text = await textContents.findById(falseAsw2.content);
                if (falseAsw3)
                    falseAsw3Text = await textContents.findById(falseAsw3.content);

                questions.push({
                    id: question.id,
                    content: content,
                    answers: [
                        { id: trueAnswer._id, text: trueAnswerText },
                        { id: falseAsw1._id, text: falseAsw1Text },
                        { id: falseAsw2._id, text: falseAsw2Text },
                        { id: falseAsw3._id, text: falseAsw3Text }
                    ]
                });
            })
        );
        
        return res.status(200).json({ nameRes, questions });
    } catch (error) {
        return res.status(400).json({ success: false, error });
    }
});


//Submit assignment
router.post("/SubmitAssignmnet/:testId", verifyToken, async (req, res) => {
    const testId = req.params.testId;
    const answers = req.body.answers; // answers = { 'questionId1': 'answerId1', 'questionId2': 'answerId2' }

    if (!answers)
        return res.status(400).json({ success: false, message: "answers are required" });


    try {
        const test = await Test.findById(testId);
        if (!test)
            return res.status(404).json({ success: false, message: "Test not found with this ID:" + testId });

        const questions = await Question.find({ testId: test.id });
        let score = 0;
        let answerToStore = []
        await Promise.all(
            questions.map(async (question) => {
                const answerId = answers[question.id];
                answerToStore.push({questionId: question.id, answerId: answerId})
                if (answerId && answerId == question.trueAnswer) {
                    score++;
                }
            })
        );

        const newSubmitAssignment = new DoAssignment({
            userId: req.userId,
            testId,
            score,
            answers: answerToStore
        });

        await newSubmitAssignment.save();
        return res.status(200).json({ success: true, message: "Assignment submitted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
});


//user get submited assignment
router.get("/SubmitAssignmnet/:testId",verifyToken, async (req, res) => {
    const testId = req.params.testId;
    const userId = req.userId; 

    
    try {
        const submitted = await DoAssignment.find({ testId, userId }).sort({ createdAt: -1 });
        if (!submitted.length) {
            return res.status(200).json({ success: true, AssignmentSubmitted: false, message: "Assignment has not been submitted" });
        }
        const questions = await Question.find({ testId }).select("_id trueAnswer").lean();
        const score = submitted[0].score*100/(questions.length)
        return res.status(200).json({ success: true,AssignmentSubmitted: true, message: "Assignment has been submitted",trueAnswers: questions, userAnswers: submitted[0].answers, score });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

//get one test
router.get("/:testId", verifyToken, async (req, res) => {

    const testId = req.params.testId
    try {
        const test = await Test.findById(testId)
        if (!test)
            return res.status(404).json({ success: false, message: "Test not found with this ID:" + testId })
        const QuestionList = await Question.find({ testId: testId })
        const nameRes = await textContents.findById(test.name)
        let questions = []
        await Promise.all(
            QuestionList.map(async (question) => {
                const trueAnswer = await Answers.findById(question.trueAnswer)
                const falseAsw1 = await Answers.findById(question.falseAnswer1)
                const falseAsw2 = await Answers.findById(question.falseAnswer2)
                const falseAsw3 = await Answers.findById(question.falseAnswer3)
                const content = await textContents.findById(question.question)
                let trueAnswerText = {}
                let falseAsw1Text = {}
                let falseAsw2Text = {}
                let falseAsw3Text = {}
                if (trueAnswer)
                    trueAnswerText = await textContents.findById(trueAnswer.content)
                if (falseAsw1)
                    falseAsw1Text = await textContents.findById(falseAsw1.content)
                if (falseAsw2)
                    falseAsw2Text = await textContents.findById(falseAsw2.content)
                if (falseAsw3)
                    falseAsw3Text = await textContents.findById(falseAsw3.content)

                questions.push({ content: content, trueAsw: trueAnswerText, falseAsw1: falseAsw1Text, falseAsw2: falseAsw2Text, falseAsw3: falseAsw3Text })
            })
        )
        return res.status(200).json({ nameRes, questions })
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
})


// add new test
router.post("/post", verifyToken, async (req, res) => {

    const { Vietnamese, Khmer, English, groupIds } = req.body;
    if (!Vietnamese || !Khmer || !English)
        return res
            .status(400)
            .json({ success: false, message: "Name in all languages are required" });
    const nameCheck = await textContents.findOne({ Vietnamese: Vietnamese, Khmer: Khmer, English: English })

    if (nameCheck) {
        return res
            .status(400)
            .json({ success: false, message: "This name already taken" })
    }
    let goupsAddAssignmentfail = []
    let groupAddAssignmentSuccess = []
    if (groupIds)
        await Promise.all(
            groupIds.map(async (groupId) => {
                const group = await Groups.findById(groupId)
                if (!group)
                    goupsAddAssignmentfail.push(groupId)
                else
                    groupAddAssignmentSuccess.push(groupId)
            })
        )
    const newName = new textContents({
        Vietnamese: Vietnamese,
        Khmer: Khmer,
        English: English,
    });
    await newName.save();
    try {
        const newTest = new Test({
            name: newName.id,
            group: groupAddAssignmentSuccess,
        })

        await newTest.save()
        return res.status(200).json({ success: true, message: "new test added successfully (may accept some group): ", goupsAddAssignmentfail, testId: newTest.id })
    } catch (error) {
        await textContents.findByIdAndDelete(newName.id)
        return res
            .status(400)
            .json({ success: false, message: "An error occurred", error });
    }
})

// add new question
router.post("/:testId/post", verifyToken, async (req, res) => {
    const testId = req.params.testId;
    const test = await Test.findById(testId);

    if (!test) {
        return res
            .status(404)
            .json({ success: false, message: "Test not found with this testId: " + testId });
    }

    const { content, trueAnswer, falseAnswer1, falseAnswer2, falseAnswer3 } = req.body;

    if (!content || !trueAnswer || !falseAnswer1 || !falseAnswer2 || !falseAnswer3) {
        return res
            .status(400)
            .json({ success: false, message: "Content in all languages is required" });
    }

    let newContent, newTrueAnswerText, newFalseAnswer1Text, newFalseAnswer2Text, newFalseAnswer3Text;
    let newTrueAnswer, newFalseAsw1, newFalseAsw2, newFalseAsw3;

    try {
        newContent = new textContents({
            Vietnamese: content.Vietnamese,
            Khmer: content.Khmer,
            English: content.English,
        });

        newTrueAnswerText = new textContents({
            Vietnamese: trueAnswer.Vietnamese,
            Khmer: trueAnswer.Khmer,
            English: trueAnswer.English,
        });

        newFalseAnswer1Text = new textContents({
            Vietnamese: falseAnswer1.Vietnamese,
            Khmer: falseAnswer1.Khmer,
            English: falseAnswer1.English,
        });

        newFalseAnswer2Text = new textContents({
            Vietnamese: falseAnswer2.Vietnamese,
            Khmer: falseAnswer2.Khmer,
            English: falseAnswer2.English,
        });

        newFalseAnswer3Text = new textContents({
            Vietnamese: falseAnswer3.Vietnamese,
            Khmer: falseAnswer3.Khmer,
            English: falseAnswer3.English,
        });

        await newContent.save();
        await newTrueAnswerText.save();
        await newFalseAnswer1Text.save();
        await newFalseAnswer2Text.save();
        await newFalseAnswer3Text.save();

        newTrueAnswer = new Answers({ content: newTrueAnswerText.id });
        newFalseAsw1 = new Answers({ content: newFalseAnswer1Text.id });
        newFalseAsw2 = new Answers({ content: newFalseAnswer2Text.id });
        newFalseAsw3 = new Answers({ content: newFalseAnswer3Text.id });

        await newTrueAnswer.save();
        await newFalseAsw1.save();
        await newFalseAsw2.save();
        await newFalseAsw3.save();

        const newQuestion = new Question({
            testId: test.id,
            question: newContent.id,
            trueAnswer: newTrueAnswer.id,
            falseAnswer1: newFalseAsw1.id,
            falseAnswer2: newFalseAsw2.id,
            falseAnswer3: newFalseAsw3.id,
        });

        await newQuestion.save();

        const questionList = await Question.find({ testId: test.id })
        test.questionCount = questionList.length
        await test.save();

        return res.status(200).json({ success: true, message: "Question added successfully" });
    } catch (error) {
        if (newContent) await textContents.deleteOne({ _id: newContent.id });
        if (newTrueAnswerText) await textContents.deleteOne({ _id: newTrueAnswerText.id });
        if (newFalseAnswer1Text) await textContents.deleteOne({ _id: newFalseAnswer1Text.id });
        if (newFalseAnswer2Text) await textContents.deleteOne({ _id: newFalseAnswer2Text.id });
        if (newFalseAnswer3Text) await textContents.deleteOne({ _id: newFalseAnswer3Text.id });
        if (newTrueAnswer) await Answers.deleteOne({ _id: newTrueAnswer.id });
        if (newFalseAsw1) await Answers.deleteOne({ _id: newFalseAsw1.id });
        if (newFalseAsw2) await Answers.deleteOne({ _id: newFalseAsw2.id });
        if (newFalseAsw3) await Answers.deleteOne({ _id: newFalseAsw3.id });

        return res.status(500).json({ success: false, message: "An error occurred", error });
    }
});

//delete a test
router.delete("/:testId", verifyToken, async (req, res) => {
    const testId = req.params.testId;
    try {
        const questionList = await Question.find({ testId: testId })
        await Promise.all(
            questionList.map(async (question) => {
                await textContents.findByIdAndDelete(question.question)
                if (question.trueAnswer) {
                    await textContents.findByIdAndDelete(question.trueAnswer.content)
                    await Answers.findByIdAndDelete(question.trueAnswer._id)
                }
                if (question.falseAnswer1) {
                    await textContents.findByIdAndDelete(question.falseAnswer1.content)
                    await Answers.findByIdAndDelete(question.falseAnswer1._id)
                }
                if (question.falseAnswer2) {
                    await textContents.findByIdAndDelete(question.falseAnswer2.content)
                    await Answers.findByIdAndDelete(question.falseAnswer2._id)
                }
                if (question.falseAnswer3) {
                    await textContents.findByIdAndDelete(question.falseAnswer3.content)
                    await Answers.findByIdAndDelete(question.falseAnswer3._id)
                }
                await Question.findByIdAndDelete(question._id)
            })
        )
        const test = await Test.findByIdAndDelete(testId)
        if (test)
            await textContents.findByIdAndDelete(test.name)

        return res.status(200).json({ success: true, message: "Test delete successfully" })
    } catch (error) {
        if (error && error.name && error.name == "CastError")
            return res.status(404).json({ success: false, message: "Not found test with id=" + testId })
        return res.status(500).json({ success: false, message: "An error occurred", error });
    }
})

//delete a question
router.delete("/:testId/:questionId", verifyToken, async (req, res) => {
    const testId = req.params.testId
    const questionId = req.params.questionId
    try {
        const question = await Question.findById(questionId)
        if (!question)
            return res.status(404).json({ success: false, message: "Not found question with id=" + questionId })

        await textContents.findByIdAndDelete(question.question)
        if (question.trueAnswer) {
            await textContents.findByIdAndDelete(question.trueAnswer.content)
            await Answers.findByIdAndDelete(question.trueAnswer._id)
        }
        if (question.falseAnswer1) {
            await textContents.findByIdAndDelete(question.falseAnswer1.content)
            await Answers.findByIdAndDelete(question.falseAnswer1._id)
        }
        if (question.falseAnswer2) {
            await textContents.findByIdAndDelete(question.falseAnswer2.content)
            await Answers.findByIdAndDelete(question.falseAnswer2._id)
        }
        if (question.falseAnswer3) {
            await textContents.findByIdAndDelete(question.falseAnswer3.content)
            await Answers.findByIdAndDelete(question.falseAnswer3._id)
        }
        await Question.findByIdAndDelete(question._id)
        const test = await Test.findById(testId)
        const questionList = await Question.find({ testId: testId })
        if (questionList)
            test.questionCount = questionList.length
        await test.save();
        return res.status(200).json({ success: true, message: "Question delete successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred", error });
    }
})

export default router