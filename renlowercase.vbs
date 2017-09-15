' RenLowercase.vbs  -  Rename files and directories to lowercase
'
' This script renames all the files and subdirectories in the current
' directory and all it's subdirectories to lowercase.
'
' Author: Christian d'Heureuse (www.source-code.biz)
' License: GNU/LGPL (http://www.gnu.org/licenses/lgpl.html)

Option Explicit

Dim StdIn:  Set StdIn = WScript.StdIn
Dim StdOut: Set StdOut = WScript.StdOut
Dim fso:    Set fso = CreateObject("Scripting.FileSystemObject")

Dim FilesRenamed:   FilesRenamed = 0
Dim FilesSkipped:   FilesSkipped = 0
Dim FoldersRenamed: FoldersRenamed = 0
Dim FoldersSkipped: FoldersSkipped = 0

Main

Sub Main
   Dim CurrentFolder: Set CurrentFolder = fso.GetFolder(".")
   StdOut.WriteLine "Warning: All files and subdirectories within the directory """ & _
         CurrentFolder.Path & """ and all it's subdirectories will be renamed to lowercase."
   If Not PromptYesNo("Continue?") Then Exit Sub
   ProcessFolder CurrentFolder
   StdOut.WriteLine FilesRenamed & " Files and " & FoldersRenamed & " Folders renamed to lowercase."
   StdOut.WriteLine FilesSkipped & " Files and " & FoldersSkipped & " Folders were already lowercase."
   End Sub

Sub ProcessFolder (ByVal Folder)
   Dim Files: Set Files = Folder.Files
   Dim File
   For Each File In Files
      If File.Name <> LCase(File.Name) Then
         File.Move LCase(File.Path)
         FilesRenamed = FilesRenamed + 1
        Else
         FilesSkipped = FilesSkipped + 1
         End If
      Next
   Dim SubFolders: Set SubFolders = Folder.SubFolders
   Dim SubFolder
   For Each SubFolder In SubFolders
      If SubFolder.Name <> LCase(SubFolder.Name) Then
         SubFolder.Move LCase(SubFolder.Path)
         FoldersRenamed = FoldersRenamed + 1
        Else
         FoldersSkipped = FoldersSkipped + 1
         End If
      ProcessFolder SubFolder
      Next
   End Sub

Function PromptYesNo (ByVal PromptText)
   Do
      StdOut.Write PromptText & " (y/n) - "
      Dim s: s = StdIn.ReadLine()
      Select Case LCase(Trim(s))
         Case "n","no"  PromptYesNo = False: Exit Function
         Case "y","yes" PromptYesNo = True:  Exit Function
         End Select
      StdOut.WriteLine "Invalid input."
      Loop
   End Function
