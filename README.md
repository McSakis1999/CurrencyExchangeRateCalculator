<h3>Introduction</h3>
Ο σκοπός της εργασίας ήταν η κατασκευή ενός εργαλείου μετατροπής συναλλάγματος, καθώς και του γραφικού
του περιβάλλοντος.

<strong>Για την υλοποίηση χρησιμοποιήθηκαν τα παρακάτω εργαλεία:</strong>

Back-End : {
framework : node.js
modules : [ express, sqlite, body-parser, cors ]
}

Front-End : {
framework : Vue.js
modules : [ axios, bootstrap, bootstrap-vue, vuex, vue-router]
}

<h4>Getting Started</h4>

<strong>Back-End:</strong>
Στον φάκελο api βρίσκεται ο κώδικας του backend συστήματος:
// Εκτελούμε node. στο index.js για να ξεκινήσει ο server
index.js : Είναι ο κύριος κώδικας όπου αρχικοποιείται ο server, τα εργαλεία καθώς και δημιουργούνται όλα τα endpoints

database.js : Εδώ βρίσκεται ο κώδικας δημιουργίας της βάσης και η καταχώρηση δεδομένων
databaseFunction.js : Εδώ δηλώνονται όλες οι συναρτήσεις που τραβάνε δεδομένα απο την βάση και τα δίνουν
στα endpoints
data.db : Η βάση δεδομένων (sqlite)
// Η βάση παρέχεται αρχικοποιημένη, όμως δίνεται ο κώδικας εισόδου τιμών σε σχόλια
<strong>Front-End :</strong>
Στον φάκελο app βρίσκεται ο κώδικας του frontend συστήματος, κύριοι φάκελοι είναι:
// Εκτελούμε cd factsetCalc και έπειτα npm run dev
components : Το σύνολο των εξαρτημάτων που χρησιμοποιήθηκαν στην εφαρμογή
router : Εδώ βρίσκεται το index.js που είναι υπεύθυνο για την πλοήγηση στην εφαρμογή
services : Εδώ βρίσκονται το σύνολο των συναρτήσεων επικοινωνίας με τα endpoints
views : Οι κύριες σελίδες της εφαρμογής
main.js : Το κύριο javascript αρχείο της εφαρμογής, όπου γίνονται δηλώσεις βιβλιοθηκών και η αρχικοποίηση του vuex store

<h4>User Interface Overview:</h4>
<strong>HomePage</strong>

![Aspose Words 597c77b5-e8f5-4094-a157-b35c9bb43742 001](https://github.com/McSakis1999/CurrencyExchangeRateCalculator/assets/58091482/e28b0a1f-aedc-49dc-abb9-c3c849656eba)

Home Button : Επιστροφή στην αρχική σελίδα
Μετατροπέας συναλλάγματος. Ο χρήστης επιλέγει το πρώτο νόμισμα , έπειτα μπορεί να επιλέξει το δεύτερο
απο την λίστα των δυνατών αποτέλεσμα. συνδυασμών και αφού προσθέσει και το ποσό μετατροπής εμφανίζεται το
Λίστα καταχωρημένων συνδυασμών
Πλήκτρα εισόδου ή δημιουργίας νέου λογαριασμού
<strong>Login Page</strong>

![Aspose Words 597c77b5-e8f5-4094-a157-b35c9bb43742 002](https://github.com/McSakis1999/CurrencyExchangeRateCalculator/assets/58091482/97914191-da4c-4d4f-b5c5-3290beb336d9)

<strong>SignUp Page</strong>

![Aspose Words 597c77b5-e8f5-4094-a157-b35c9bb43742 003](https://github.com/McSakis1999/CurrencyExchangeRateCalculator/assets/58091482/971325ba-6ba7-44e2-909a-c40c8b87215f)

<strong>Tool while user logged in</strong>

![Aspose Words 597c77b5-e8f5-4094-a157-b35c9bb43742 004](https://github.com/McSakis1999/CurrencyExchangeRateCalculator/assets/58091482/888203f8-5fde-4d21-92b5-58146a39844d)

Navigate to update currencies page (Add/Edit)
Navigate to update exchange rates page (Add/Edit)
Delete exchange rate
Log Out button: Αποσυνδέει τον χρήστη
<strong>Update Currency Page</strong>

![Aspose Words 597c77b5-e8f5-4094-a157-b35c9bb43742 005](https://github.com/McSakis1999/CurrencyExchangeRateCalculator/assets/58091482/8c13465e-a80d-4cd1-8365-8ff5a0e4cf0c)

Προσθήκη νέου νομίσματος με την καταχώρηση των παρακάτω:
name : any character [a-zA-Z]+
code : any 3 characters [a-zA-Z]+
symbol : any character

Επεξεργασία υπάρχοντος νομίσματος
// ισχύουν οι ίδιοι κανόνες
// αν παραμείνει κάποιο πεδίο κενό διατηρούνται οι προηγούμενες τιμές στο συγκεκριμένο πεδίο

<Strong>Update Exchange Rate Page</strong>

![Aspose Words 597c77b5-e8f5-4094-a157-b35c9bb43742 006](https://github.com/McSakis1999/CurrencyExchangeRateCalculator/assets/58091482/de7ec31a-9a10-4163-86b2-f67e0246a803)

Δημιουργίας νέου ζευγαριού νομισμάτων επιλέγοντας δύο υπάρχοντα και καταχωρόντας την νέα τιμή
Διαγραφή επιλεγμένου ζευγαριού
Επεξεργασία τιμής επιλεγμένου ζευγαριού
Main Features
Απλός χρήστης :
Επιλογή συνδυασμού νομισμάτων και υπολογισμός τιμής ανταλλαγής συναλλάγματος
Παρακολούθηση διαθέσιμων ζευγαριών νομισμάτων
Δημιουργία λογαριασμού
Συνδεδεμένος Χρήστης :
Λειτουργίες απλού χρήστη
Τροποποίηση/Διαγραφή/Δημιουργία νέας τιμής ανταλλαγής μεταξύ δύο νομισμάτων
Τροποποίηση/Διαγραφή/Δημιουργία νομίσματος
