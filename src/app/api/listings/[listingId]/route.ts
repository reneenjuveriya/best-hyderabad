import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";


 

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ listingId: string }> }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = await context.params;

  if(!listingId || typeof listingId != 'string'){
    throw new Error('Invalid Id');
  }
 

  const listing = await prisma.listing.deleteMany({
    where : {
        id: listingId,
        userId: currentUser.id
    }
  });


  return NextResponse.json(listing);
}
