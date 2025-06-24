const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const books = require('../models/books');


router.get('/books', async (req, res) => {
    try {
        const Books = await books.find()
        res.status(200).json({ message: 'book list fetched successfully!', data: Books })
    } catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    }
})

router.post('/addBooks', async (req, res) => {
    try {
        const newbook = new books({
            id:req.body.id,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            isbn: req.body.isbn,
            image: req.body.image,
            pages: req.body.pages,
            stock: req.body.stock,
            reviews: req.body.reviews,
            published: req.body.published,
            publisher: req.body.publisher,
            price: req.body.price
        })
        await newbook.save()
        res.status(200).json({ message: 'book added successfully!', data: newbook })

    } catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    }
})
router.put('/updateBook', async (req, res) => {
    try {
        bookId = req.body._id
        const updateFields = {};
        if (req.body.id !== undefined) updateFields.id = req.body.id;
        if (req.body.title !== undefined) updateFields.title = req.body.title;
        if (req.body.author !== undefined) updateFields.author = req.body.author;
        if (req.body.genre !== undefined) updateFields.genre = req.body.genre;
        if (req.body.description !== undefined) updateFields.description = req.body.description;
        if (req.body.isbn !== undefined) updateFields.isbn = req.body.isbn;
        if (req.body.image !== undefined) updateFields.image = req.body.image;
        if (req.body.pages !== undefined) updateFields.pages = req.body.pages;
        if (req.body.stock !== undefined) updateFields.stock = req.body.stock;
        if (req.body.reviews !== undefined) updateFields.reviews = req.body.reviews;
        if (req.body.published !== undefined) updateFields.published = req.body.published;
        if (req.body.publisher !== undefined) updateFields.publisher = req.body.publisher;
        if (req.body.price !== undefined) updateFields.price = req.body.price;

        const bookUpdate = await books.findOneAndUpdate(
            { "_id": bookId },
            { $set: updateFields },
            { new: true }
        );
        if (bookUpdate == null) {
            return res.status(400).json({ message: 'book not found' });
        } else {
            res.status(200).json({ message: 'stock updated successfully', data: bookUpdate });
        }
    } catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    }
})

router.delete('/removeBook', async (req, res) => {
    try {
        bookid = req.body_id
        const delBook = await books.findOneAndDelete({ "id": bookid })
        if (delBook.deletedCount == 0) {
            return res.status(404).json({ message: 'Book not found' });
        } else {
            res.status(200).json({ message: 'book removed successfully', data: delBook });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'ran into an error', err })
    }
})

router.get('/bookDetail',async(req,res)=>{
    try{
         const bookID=Number(req.query.id);
        const book= await books.findOne({id:bookID})
        res.status(200).json({message:'book details are:', book})
    }catch(err){
        res.status(500).json({message:'ran into an error',err})
    }
})

module.exports = router;