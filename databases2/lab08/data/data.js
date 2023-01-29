
const fs = require('fs')
const driver = require('../config/neo4jDriver');

const csv = fs.readFileSync('./data/organizacje.csv', 'utf-8')
const tab = csv.split('\n')
const data = tab.reduce((acc, line, index) =>{
    if (index !== 0 && index !== tab.length-1){
        const tab = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        const object = {
        organizationNr: tab[0],
        name: tab[1],
        registrationDate: tab[2],
        nrEmployees: tab[3],
        ownedBy_organizationNr: tab[4],
        ownershipPercentage: tab[5],
        organizationForm: tab[6],
        address: tab[7],
        postalCode: tab[8],
        town: tab[9],
        municipalityNr: tab[10],
        municipality: tab[11],
        countryCode: tab[12],
        country: tab[13],
    }
    return [...acc, object]
    }
    else console.log(line); return acc
}, [])

async function createNodes(node){
    const session = driver.session();
    await session
        .run('MERGE (o:Organization {organizationNr: $organizationNr, name: $name, registrationDate: date($registrationDate), nrEmployees: $nrEmployees, ownedBy_organizationNr: $ownedBy_organizationNr, ownershipPercentage: $ownershipPercentage, organizationForm: $organizationForm})', 
        {'organizationNr': node.organizationNr, 'name': node.name, 'registrationDate': node.registrationDate, 'nrEmployees': node.nrEmployees, 'ownedBy_organizationNr': node.ownedBy_organizationNr, 'ownershipPercentage': node.ownershipPercentage, 'organizationForm': node.organizationForm})
    session.close();
    const session2 = driver.session();
    await session2
    .run('MERGE (a:Address {address: $address, postalCode: $postalCode, town: $town, municipalityNr: $municipalityNr, municipality: $municipality, countryCode: $countryCode, country: $country})', 
        {'address': node.address, 'postalCode': node.postalCode, 'town': node.town, 'municipalityNr': node.municipalityNr, 'municipality': node.municipality, 'countryCode': node.countryCode, 'country': node.country})
    session2.close();
    const session3 = driver.session();
    await session3
    .run(`MATCH (o:Organization {organizationNr: $organizationNr}),(a:Address {address: $address, postalCode: $postalCode, town: $town, municipalityNr: $municipalityNr, municipality: $municipality, countryCode: $countryCode, country: $country}) ` +
    `MERGE (o)-[r:ADDRESS]->(a) ` +
    `RETURN type(r)`, {'organizationNr': node.organizationNr, 'address': node.address, 'postalCode': node.postalCode, 'town': node.town, 'municipalityNr': node.municipalityNr, 'municipality': node.municipality, 'countryCode': node.countryCode, 'country': node.country})
    session3.close();
    const session4 = driver.session();
    await session4
    .run(`MATCH (o:Organization {organizationNr: $organizationNr}),(c:Organization {ownedBy_organizationNr: $organizationNr}) ` +
    `MERGE (o)-[r:OWNS]->(c) ` +
    `RETURN type(r)`, {'organizationNr': node.organizationNr})
    session4.close();
}

    
data.forEach(createNodes)
    