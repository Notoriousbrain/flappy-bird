import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "./config"

export const saveUserDetails = async (data) => {
    try {
        const snap = doc(firestore, "user", data.email);
        let snapData = await getDoc(snap);
        const userData = snapData.data();
        !userData &&
        await setDoc(doc(firestore, "user", data.email), data)
    } catch (error) {
        console.log(error)
    }
}

export const saveScore = async (email, score) => {
    try {
         const snap = doc(firestore, "user", email);
         let snapData = await getDoc(snap)
         const userData = snapData.data();
         if(userData.score.length === 3) return userData.score.length
         await updateDoc(snap, {
             score: userData.score.length === 0 ? [score] : [...userData.score, score],
             highestScore: userData.score.length === 0 ? score : Math.max(...userData.score, score)
            })
         snapData = await getDoc(snap)
         return userData.score.length
    } catch (error) {
        console.log(error)
    }
}

export const getPrevData = async (email) => {
    try{
        const snap = doc(firestore, "user", email);
        let snapData = await getDoc(snap);
        const userData = snapData.data();
        return userData;
    }catch(error) {
        console.log(error)
    }
}


export const getHighestScores = async () => {
    try {
        const ref = collection(firestore, "user")
        const sakura = await getDocs(ref)
        let users = [];
        sakura.forEach(user => users.push(user.data()))
        let highestScores = [];
        users.forEach(
          (user) =>
            user.highestScore &&
            highestScores.push({
              highestScore: user.highestScore,
              userName: user.userName,
            })
        );
       highestScores.sort((a,b) => { return b.highestScore - a.highestScore})
        // console.log(sorted)
        return highestScores;
    } catch (error) {
        console.log(error)
    }
}