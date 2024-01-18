import httpx
import json
import trio
import sys
import os

from ghunt.apis.peoplepa import PeoplePaHttp
from ghunt.objects.base  import GHuntCreds
from ghunt.objects       import encoders

from os.path             import exists

cred_file = 'creds.txt'

async def main():
    if len(sys.argv) < 3:
        print("Usage: python ghuntQuery.py <creds> <email>")
        sys.exit(1)

    if not exists(cred_file):
        cf = open(cred_file, 'w')
        cf.write(sys.argv[1])
        cf.close()

    ghunt_creds = GHuntCreds(cred_file)
    ghunt_creds.load_creds(silent=True)

    client = httpx.AsyncClient()
    email         = sys.argv[2]

    people_api    = PeoplePaHttp(ghunt_creds)
    found, person = await people_api.people_lookup(client, email, params_template='max_details')

    await client.aclose()
    response = json.loads(json.dumps(person, cls=encoders.GHuntEncoder))

    if found:

        info = {
            'id'           : response['personId'],
            'last_updated' : response['sourceIds']['PROFILE']['lastUpdated'],
            'maps_url'     : 'https://www.google.com/maps/contrib/' + response['personId'],
            'pfp_url'      : response['profilePhotos']['PROFILE']['url'],
            'cover_url'    : response['coverPhotos']['PROFILE']['url'],
            'name'         : response['names']['PROFILE']['fullname'],
            'emails'       : response['emails']['PROFILE']
        }

        print(json.dumps(info, indent=4))
        return response
    else:
        print('false')


trio.run(main)
