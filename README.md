## Utvecklingsprocess

Jag började med att skapa en första design i Figma för alla grundläggande sidor. Under utvecklingsprocessen fick jag visserligen gå tillbaka till Figma och ändra flera gånger, men det var ett bra underlag för att komma igång i början. Efter detta skapade jag mitt react-projekt och implementerade all HTML och CSS med hårdkodad data först för att bättre förstå komponentstrukturen. Även om detta tog lite extra tid till en början, gav det mig bättre förståelse för varje del av systemet. Ursprungligen planerade jag att använda den färdiga HTML/CSS som Figma genererade, men framför allt HTML var väldigt dåligt uppbyggt, så jag valde att själv göra både HTML och CSS från grunden, med viss inspiration från det som Figma föreslog. När frontend-strukturen var klar med hårdkodad data, byggde jag upp min db.json, api.js och context-filerna.

## Tekniska val

För att organisera min kod delade jag upp appen i många olika komponenter som jag kunde återanvända i andra komponenter och pages. Jag använde även contexts för att dela information mellan komponenter istället för att skicka data genom långa kedjor. Jag separerade all api-logik i en egen fil, vilket först kändes lite onödigt, men jag insåg sen att det gjorde koden mycket renare och att jag kunde återanvända api-funktioner mellan komponenter.

Jag valde att använda olika valideringsnivåer på login/register och betalningsinformation. För login/register-formulären använder jag grundläggande validering, lite väl enkel om det skulle användas i verkligheten, medan betalningsformulären har mer avancerad validering med automatisk formattering och specifik validering av kortinformation och telefonnummer. Ett förbättringsområde hade varit en mer omfattande inloggningsprocess med krav för lösenord (längd, stor/liten bokstav, bekräfta lösenord) och säkrare datalagring med hash/salt-funktionalitet. Just nu sparas lösenordet i databasen vilket inte hade varit rimligt i en verklig applikation.

För favorithantering valde jag att spara favoriter lokalt för gäster och koppla till userId för inloggade användare genom olika localStorage-nycklar. Jag implementerade även navigation guards för att hantera navigering baserat på användarstatus.

## Problem och lösningar

Jag stötte på en hel del problem under projektets gång. Ett problem uppstod med isFormValid()-funktionen, som läste gamla react state-värden eftersom setState inte uppdateras direkt. Detta hindrade användare från att genomföra beställningar trots att alla uppgifter var korrekt ifyllda. För att lösa detta ändrade jag funktionen så att den tog emot aktuell data som parameter istället för att använda gamla state-värden. Ett annat problem var att favoriter försvann när jag uppdaterade sidan eftersom tom data skrev över sparade favoriter. Problemet uppstod eftersom favoritesContext är beroende av userContext för att bestämma rätt localStorage-nyckel, vilket skapade felaktig ordning när sidan laddas. Lösningen blev att jag implementerade en kontrollvariabel som förhindrar sparning innan sidans initiala laddning är klar.

## Utmaningar och reflektion

De största utmaningarna för mig var Figma och CSS-arbetet, som var både pilligt och tidskrävande. Jag lärde mig dock många olika funktioner i Figma under processen vilket underlättade och gjorde att det gick snabbare efter hand. Till en början hade jag även svårt att förstå kopplingen mellan alla filer eftersom projektet blev mycket större än något jag gjort tidigare.

Den största insikten var nog att jag fick en bättre förståelse för hur bra det faktiskt är att separera kod i olika filer och contexts för att kunna återanvända och hålla koden organiserad. Detta projekt har lärt mig mycket om hur viktigt det är med strukturerad planering och att våga prova mig fram med olika lösningar när det uppstår problem. Jag förde också dagliga anteckningar om vad jag gjort, vilka problem jag stött på och hur jag löst dem, vilket var bra både för att komma ihåg och för att kunna gå tillbaka och reflektera över olika beslut och lösningar.

Om jag hade haft mer tid för projektet hade jag skapat en separat backend med node.js, jobbat mer med säkerheten och lite mer med den responsiva layouten. Men överlag är jag nöjd med resultatet och tycker att det varit både väldigt lärorikt och roligt att inse att man har de kunskaper som krävs för att bygga en lite större fungerande applikation.
